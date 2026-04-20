'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import css from './HomeParallaxScene.module.css';

type LayerKind = 'background' | 'trees' | 'log' | 'bear';

interface LayerMotion {
  object: THREE.Object3D;
  homePosition: THREE.Vector3;
  homeRotation: THREE.Euler;
  strength: number;
  verticalStrength: number;
  rotationStrength: number;
}

const MODEL_URL = '/hersection_model_new.glb';
const REFERENCE_MODEL_SIZE = {
  width: 2.8160011768341064,
  height: 1.5360006093978882,
};

const layerSettings: Record<
  LayerKind,
  { strength: number; verticalStrength: number; rotationStrength: number; order: number; depth: number }
> = {
  background: { strength: 0.01, verticalStrength: 0.006, rotationStrength: 0.001, order: 0, depth: -0.08 },
  trees: { strength: 0.036, verticalStrength: 0.02, rotationStrength: 0.004, order: 10, depth: 0.04 },
  log: { strength: 0.064, verticalStrength: 0.034, rotationStrength: 0.008, order: 20, depth: 0.16 },
  bear: { strength: 0.092, verticalStrength: 0.048, rotationStrength: 0.012, order: 30, depth: 0.28 },
};

const materialLayerMap = new Map<string, LayerKind>([
  ['59', 'bear'],
  ['67', 'log'],
  ['75', 'trees'],
  ['81', 'trees'],
  ['87', 'trees'],
  ['92', 'background'],
  ['93', 'trees'],
]);

function getMeshMaterialName(mesh: THREE.Mesh) {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  return material?.name ?? '';
}

function getLayerKind(mesh: THREE.Mesh): LayerKind {
  const mappedLayer = materialLayerMap.get(getMeshMaterialName(mesh));

  if (mappedLayer) {
    return mappedLayer;
  }

  const z = mesh.position.z;

  if (z > 0.1) {
    return 'bear';
  }

  if (z > 0.082) {
    return 'log';
  }

  if (z > 0.06) {
    return 'trees';
  }

  return 'background';
}

function inferLayerKinds(meshes: THREE.Mesh[]) {
  const inferredLayers = new Map<THREE.Mesh, LayerKind>();
  const unknownMeshes = meshes.filter((mesh) => !materialLayerMap.has(getMeshMaterialName(mesh)));

  if (unknownMeshes.length === 0) {
    return inferredLayers;
  }

  const worldPosition = new THREE.Vector3();
  const rankedUnknownMeshes = unknownMeshes
    .map((mesh) => ({
      mesh,
      worldZ: mesh.getWorldPosition(worldPosition).z,
    }))
    .sort((left, right) => right.worldZ - left.worldZ);

  const presetOrders: Partial<Record<number, LayerKind[]>> = {
    1: ['background'],
    2: ['bear', 'background'],
    3: ['bear', 'trees', 'background'],
    4: ['bear', 'log', 'trees', 'background'],
  };

  const presetOrder = presetOrders[rankedUnknownMeshes.length];

  if (presetOrder) {
    presetOrder.forEach((layer, index) => {
      inferredLayers.set(rankedUnknownMeshes[index].mesh, layer);
    });

    return inferredLayers;
  }

  const middleIndex = rankedUnknownMeshes.length / 2;

  rankedUnknownMeshes.forEach(({ mesh }, index) => {
    const layer =
      index === 0 ? 'bear' : index === rankedUnknownMeshes.length - 1 ? 'background' : index < middleIndex ? 'log' : 'trees';

    inferredLayers.set(mesh, layer);
  });

  return inferredLayers;
}

function configureMesh(mesh: THREE.Mesh, layer: LayerKind) {
  mesh.frustumCulled = false;
  mesh.renderOrder = layerSettings[layer].order;

  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  const flatMaterials = materials.map((material) => {
    const texturedMaterial = material as THREE.Material & {
      map?: THREE.Texture | null;
      alphaMap?: THREE.Texture | null;
      color?: THREE.Color;
      vertexColors?: boolean;
    };

    const flatMaterial = new THREE.MeshBasicMaterial({
      map: texturedMaterial.map ?? null,
      alphaMap: texturedMaterial.alphaMap ?? null,
      color: texturedMaterial.color ?? new THREE.Color(0xffffff),
      vertexColors: texturedMaterial.vertexColors ?? false,
      opacity: material.opacity,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      alphaTest: 0.01,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    flatMaterial.name = material.name;
    material.dispose();

    return flatMaterial;
  });

  mesh.material = Array.isArray(mesh.material) ? flatMaterials : flatMaterials[0];
}

function setLayerDepth(mesh: THREE.Mesh, layer: LayerKind) {
  const layerDepth = layerSettings[layer].depth;
  mesh.position.z = layerDepth + mesh.position.z * 0.01;
}

function disposeScene(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];

    materials.forEach((material) => {
      const texturedMaterial = material as THREE.Material & {
        map?: THREE.Texture;
        alphaMap?: THREE.Texture;
        normalMap?: THREE.Texture;
        roughnessMap?: THREE.Texture;
        metalnessMap?: THREE.Texture;
      };

      texturedMaterial.map?.dispose();
      texturedMaterial.alphaMap?.dispose();
      texturedMaterial.normalMap?.dispose();
      texturedMaterial.roughnessMap?.dispose();
      texturedMaterial.metalnessMap?.dispose();
      material.dispose();
    });
  });
}

export default function HomeParallaxScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    let frameId = 0;
    let disposed = false;
    let modelRoot: THREE.Object3D | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    const layers: LayerMotion[] = [];

    document.documentElement.setAttribute('data-home-scroll', 'true');

    const scene = new THREE.Scene();
    const pivot = new THREE.Group();
    scene.add(pivot);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    mount.appendChild(renderer.domElement);

    const renderSize = new THREE.Vector2();
    const modelSize = new THREE.Vector3(1, 1, 1);

    const fitScene = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      if (!width || !height) {
        return;
      }

      renderSize.set(width, height);
      renderer.setSize(width, height, false);

      if (!modelRoot) {
        return;
      }

      const aspect = width / height;
      const viewportHeight = width < 700 ? 2.25 : width < 1100 ? 2.02 : 1.85;
      const viewportWidth = viewportHeight * aspect;
      const layerScale = width < 700 ? 0.82 : width < 1100 ? 1.14 : 1.38;

      camera.left = -viewportWidth / 2;
      camera.right = viewportWidth / 2;
      camera.top = viewportHeight / 2;
      camera.bottom = -viewportHeight / 2;
      camera.updateProjectionMatrix();

      const modelScaleFactor = Math.min(
        REFERENCE_MODEL_SIZE.width / Math.max(modelSize.x, 0.001),
        REFERENCE_MODEL_SIZE.height / Math.max(modelSize.y, 0.001)
      );

      pivot.scale.setScalar(layerScale * modelScaleFactor);
      pivot.position.set(width < 700 ? -0.18 : width < 1100 ? -0.08 : -0.24, width < 700 ? -0.08 : -0.04, 0);
    };

    resizeObserver = new ResizeObserver(fitScene);
    resizeObserver.observe(mount);

    const loader = new GLTFLoader();

    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) {
          disposeScene(gltf.scene);
          return;
        }

        modelRoot = gltf.scene;
        modelRoot.name = 'AweTales layered storybook background';
        pivot.add(modelRoot);

        const bounds = new THREE.Box3().setFromObject(modelRoot);
        bounds.getSize(modelSize);
        const center = bounds.getCenter(new THREE.Vector3());
        modelRoot.position.sub(center);
        modelRoot.updateMatrixWorld(true);

        const meshes: THREE.Mesh[] = [];

        modelRoot.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshes.push(child);
          }
        });

        // Rank unknown meshes front-to-back so replacement exports still get the layered parallax effect.
        const inferredLayers = inferLayerKinds(meshes);

        meshes.forEach((child) => {
          const layer = inferredLayers.get(child) ?? getLayerKind(child);
          const settings = layerSettings[layer];

          setLayerDepth(child, layer);
          configureMesh(child, layer);
          layers.push({
            object: child,
            homePosition: child.position.clone(),
            homeRotation: child.rotation.clone(),
            strength: settings.strength,
            verticalStrength: settings.verticalStrength,
            rotationStrength: settings.rotationStrength,
          });
        });

        fitScene();
        setReady(true);
      },
      undefined,
      (error) => {
        console.error('Unable to load the AweTales GLB background.', error);
      }
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (reduceMotion) {
        return;
      }

      pointerTarget.set((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2);
    };

    const settlePointer = () => {
      pointerTarget.set(0, 0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', settlePointer);
    window.addEventListener('blur', settlePointer);

    const animate = () => {
      pointerCurrent.lerp(pointerTarget, reduceMotion ? 1 : 0.055);

      layers.forEach((layer) => {
        layer.object.position.set(
          layer.homePosition.x + pointerCurrent.x * layer.strength,
          layer.homePosition.y - pointerCurrent.y * layer.verticalStrength,
          layer.homePosition.z
        );
        layer.object.rotation.set(
          layer.homeRotation.x,
          layer.homeRotation.y,
          layer.homeRotation.z + pointerCurrent.x * layer.rotationStrength
        );
      });

      pivot.rotation.set(-pointerCurrent.y * 0.004, pointerCurrent.x * 0.006, 0);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    fitScene();
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', settlePointer);
      window.removeEventListener('blur', settlePointer);
      resizeObserver?.disconnect();
      document.documentElement.removeAttribute('data-home-scroll');

      if (modelRoot) {
        disposeScene(modelRoot);
      }

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`${css.scene} ${ready ? css.ready : ''}`} aria-hidden="true">
      <div ref={mountRef} className={css.canvasMount} />
    </div>
  );
}
