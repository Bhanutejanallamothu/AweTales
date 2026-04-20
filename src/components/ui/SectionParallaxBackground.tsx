'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import css from './SectionParallaxBackground.module.css';

interface SectionParallaxBackgroundProps {
  modelPath: string;
  className?: string;
  coverScale?: number;
  offsetX?: number;
  offsetY?: number;
  offsetXRatio?: number;
  offsetYRatio?: number;
  viewportHeight?: number;
  pointerStrength?: number;
}

interface LayerMotion {
  object: THREE.Object3D;
  homePosition: THREE.Vector3;
  homeRotation: THREE.Euler;
  strength: number;
  verticalStrength: number;
  rotationStrength: number;
}

type LayerKind = 'bear' | 'log' | 'background';

const layerMotionSettings: Record<
  LayerKind,
  { strength: number; verticalStrength: number; rotationStrength: number; renderOrder: number }
> = {
  bear: { strength: 0.085, verticalStrength: 0.052, rotationStrength: 0.0064, renderOrder: 30 },
  log: { strength: 0.044, verticalStrength: 0.028, rotationStrength: 0.0036, renderOrder: 20 },
  background: { strength: 0.016, verticalStrength: 0.011, rotationStrength: 0.0012, renderOrder: 10 },
};

function configureMesh(mesh: THREE.Mesh, renderOrder: number) {
  mesh.frustumCulled = false;
  mesh.renderOrder = renderOrder;

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

function assignLayerKinds(meshes: THREE.Mesh[]) {
  const layerOrder: LayerKind[] = ['bear', 'log', 'background'];
  const worldPosition = new THREE.Vector3();
  const rankedMeshes = meshes
    .map((mesh) => ({
      mesh,
      worldZ: mesh.getWorldPosition(worldPosition).z,
    }))
    .sort((left, right) => right.worldZ - left.worldZ);

  return rankedMeshes.map(({ mesh }, index) => ({
    mesh,
    layer: layerOrder[index] ?? 'background',
  }));
}

export default function SectionParallaxBackground({
  modelPath,
  className = '',
  coverScale = 1.18,
  offsetX = 0,
  offsetY = 0,
  offsetXRatio = 0,
  offsetYRatio = 0,
  viewportHeight = 2,
  pointerStrength = 1,
}: SectionParallaxBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    const interactiveArea = mount?.parentElement;

    if (!mount || !interactiveArea) {
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

    const modelSize = new THREE.Vector3(1, 1, 1);

    const fitScene = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      if (!width || !height) {
        return;
      }

      const aspect = width / height;
      const viewportWidth = viewportHeight * aspect;

      renderer.setSize(width, height, false);
      camera.left = -viewportWidth / 2;
      camera.right = viewportWidth / 2;
      camera.top = viewportHeight / 2;
      camera.bottom = -viewportHeight / 2;
      camera.updateProjectionMatrix();

      if (!modelRoot) {
        return;
      }

      const coverScaleFactor = Math.max(
        viewportWidth / Math.max(modelSize.x, 0.001),
        viewportHeight / Math.max(modelSize.y, 0.001)
      );

      pivot.scale.setScalar(coverScaleFactor * coverScale);
      pivot.position.set(
        offsetX + viewportWidth * offsetXRatio,
        offsetY + viewportHeight * offsetYRatio,
        0
      );
    };

    resizeObserver = new ResizeObserver(fitScene);
    resizeObserver.observe(mount);

    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        if (disposed) {
          disposeScene(gltf.scene);
          return;
        }

        modelRoot = gltf.scene;
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

        assignLayerKinds(meshes).forEach(({ mesh, layer }) => {
          const settings = layerMotionSettings[layer];
          configureMesh(mesh, settings.renderOrder);
          layers.push({
            object: mesh,
            homePosition: mesh.position.clone(),
            homeRotation: mesh.rotation.clone(),
            strength: settings.strength * pointerStrength,
            verticalStrength: settings.verticalStrength * pointerStrength,
            rotationStrength: settings.rotationStrength * pointerStrength,
          });
        });

        fitScene();
        setReady(true);
      },
      undefined,
      (error) => {
        console.error(`Unable to load section background model: ${modelPath}`, error);
      }
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (reduceMotion) {
        return;
      }

      const rect = interactiveArea.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      pointerTarget.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        ((event.clientY - rect.top) / rect.height - 0.5) * 2
      );
    };

    const settlePointer = () => {
      pointerTarget.set(0, 0);
    };

    interactiveArea.addEventListener('pointermove', handlePointerMove, { passive: true });
    interactiveArea.addEventListener('pointerleave', settlePointer);
    window.addEventListener('blur', settlePointer);

    const animate = () => {
      pointerCurrent.lerp(pointerTarget, reduceMotion ? 1 : 0.06);

      layers.forEach((layer) => {
        layer.object.position.set(
          layer.homePosition.x + pointerCurrent.x * layer.strength,
          layer.homePosition.y - pointerCurrent.y * layer.verticalStrength,
          layer.homePosition.z
        );
        layer.object.rotation.set(
          layer.homeRotation.x + pointerCurrent.y * layer.rotationStrength * 0.4,
          layer.homeRotation.y + pointerCurrent.x * layer.rotationStrength * 0.35,
          layer.homeRotation.z + pointerCurrent.x * layer.rotationStrength
        );
      });

      pivot.rotation.set(-pointerCurrent.y * 0.008 * pointerStrength, pointerCurrent.x * 0.01 * pointerStrength, 0);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    fitScene();
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      interactiveArea.removeEventListener('pointermove', handlePointerMove);
      interactiveArea.removeEventListener('pointerleave', settlePointer);
      window.removeEventListener('blur', settlePointer);
      resizeObserver?.disconnect();

      if (modelRoot) {
        disposeScene(modelRoot);
      }

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [coverScale, modelPath, offsetX, offsetXRatio, offsetY, offsetYRatio, pointerStrength, viewportHeight]);

  return (
    <div className={`${css.scene} ${ready ? css.ready : ''} ${className}`} aria-hidden="true">
      <div ref={mountRef} className={css.canvasMount} />
    </div>
  );
}
