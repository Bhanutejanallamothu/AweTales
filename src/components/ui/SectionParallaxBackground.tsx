'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import css from './SectionParallaxBackground.module.css';

interface NamedParallaxLayer {
  name: string;
  strength: number;
  verticalStrength?: number;
  rotationStrength?: number;
  renderOrder?: number;
}

type MaterialMode = 'flat' | 'original';

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
  namedLayers?: NamedParallaxLayer[];
  materialMode?: MaterialMode;
  enablePivotTilt?: boolean;
}

interface LayerMotion {
  object: THREE.Object3D;
  homePosition: THREE.Vector3;
  homeRotation: THREE.Euler;
  strength: number;
  verticalStrength: number;
  rotationStrength: number;
  positionEase: number;
  rotationEase: number;
}

type LayerKind = 'bear' | 'log' | 'background';

const POINTER_EASE = 0.08;
const POSITION_EASE = 0.1;
const ROTATION_EASE = 0.12;
const PIVOT_EASE = 0.08;

const layerMotionSettings: Record<
  LayerKind,
  { strength: number; verticalStrength: number; rotationStrength: number; renderOrder: number }
> = {
  bear: { strength: 0.085, verticalStrength: 0.052, rotationStrength: 0.0064, renderOrder: 30 },
  log: { strength: 0.044, verticalStrength: 0.028, rotationStrength: 0.0036, renderOrder: 20 },
  background: { strength: 0.016, verticalStrength: 0.011, rotationStrength: 0.0012, renderOrder: 10 },
};

function createLayerMotion(
  object: THREE.Object3D,
  options: Pick<LayerMotion, 'strength' | 'verticalStrength' | 'rotationStrength'>,
  reduceMotion: boolean
) {
  return {
    object,
    homePosition: object.position.clone(),
    homeRotation: object.rotation.clone(),
    strength: options.strength,
    verticalStrength: options.verticalStrength,
    rotationStrength: options.rotationStrength,
    positionEase: reduceMotion ? 1 : POSITION_EASE,
    rotationEase: reduceMotion ? 1 : ROTATION_EASE,
  } satisfies LayerMotion;
}

function prepareMesh(mesh: THREE.Mesh, materialMode: MaterialMode) {
  mesh.frustumCulled = false;

  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  if (materialMode === 'original') {
    materials.forEach((material) => {
      const layeredMaterial = material as THREE.Material & {
        alphaTest?: number;
        side?: THREE.Side;
        transparent?: boolean;
        depthWrite?: boolean;
        needsUpdate?: boolean;
      };

      layeredMaterial.transparent = true;
      layeredMaterial.alphaTest = Math.max(layeredMaterial.alphaTest ?? 0, 0.01);
      layeredMaterial.side = THREE.DoubleSide;
      layeredMaterial.depthWrite = false;
      layeredMaterial.needsUpdate = true;
    });

    return;
  }

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

function setRenderOrder(target: THREE.Object3D, renderOrder: number) {
  target.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.renderOrder = renderOrder;
    }
  });
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

function hasRenderableMesh(target: THREE.Object3D) {
  let foundMesh = false;

  target.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      foundMesh = true;
    }
  });

  return foundMesh;
}

function getObjectDepth(target: THREE.Object3D) {
  let depth = 0;
  let current = target.parent;

  while (current) {
    depth += 1;
    current = current.parent;
  }

  return depth;
}

function findThreeLayerRoot(root: THREE.Object3D): THREE.Object3D | null {
  let bestMatch: THREE.Object3D | null = null;
  let bestDepth = -1;

  root.traverse((child) => {
    if (child.children.length !== 3 || !child.children.every(hasRenderableMesh)) {
      return;
    }

    const depth = getObjectDepth(child);

    if (depth > bestDepth) {
      bestMatch = child;
      bestDepth = depth;
    }
  });

  return bestMatch;
}

function getAutomaticLayerObjects(root: THREE.Object3D): Array<{ object: THREE.Object3D; layer: LayerKind }> {
  const threeLayerRoot = findThreeLayerRoot(root);

  if (!threeLayerRoot) {
    return [];
  }

  // Updated exports arrive as a fixed 3-layer stack in authoring order.
  return [
    { object: threeLayerRoot.children[0], layer: 'background' as const },
    { object: threeLayerRoot.children[1], layer: 'log' as const },
    { object: threeLayerRoot.children[2], layer: 'bear' as const },
  ];
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
  namedLayers,
  materialMode = 'flat',
  enablePivotTilt = true,
}: SectionParallaxBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    const interactiveAreaCandidate = mount?.closest('[data-parallax-root]') ?? mount?.parentElement ?? null;
    const interactiveArea = interactiveAreaCandidate instanceof HTMLElement ? interactiveAreaCandidate : null;

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(2, 4, 3);
    scene.add(ambientLight);
    scene.add(directionalLight);

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
            prepareMesh(child, materialMode);
            meshes.push(child);
          }
        });

        const resolvedNamedLayers =
          namedLayers?.flatMap((layer, index) => {
            const object = modelRoot?.getObjectByName(layer.name);

            if (!object) {
              return [];
            }

            setRenderOrder(object, layer.renderOrder ?? (index + 1) * 10);

            return [
              createLayerMotion(
                object,
                {
                  strength: layer.strength * pointerStrength,
                  verticalStrength: (layer.verticalStrength ?? layer.strength) * pointerStrength,
                  rotationStrength: (layer.rotationStrength ?? 0) * pointerStrength,
                },
                reduceMotion
              ),
            ];
          }) ?? [];

        if (resolvedNamedLayers.length > 0) {
          layers.push(...resolvedNamedLayers);
        } else {
          const automaticLayers = getAutomaticLayerObjects(modelRoot);

          if (automaticLayers.length > 0) {
            automaticLayers.forEach(({ object, layer }) => {
              const settings = layerMotionSettings[layer];
              setRenderOrder(object, settings.renderOrder);
              layers.push(
                createLayerMotion(
                  object,
                  {
                    strength: settings.strength * pointerStrength,
                    verticalStrength: settings.verticalStrength * pointerStrength,
                    rotationStrength: settings.rotationStrength * pointerStrength,
                  },
                  reduceMotion
                )
              );
            });
          } else {
            assignLayerKinds(meshes).forEach(({ mesh, layer }) => {
              const settings = layerMotionSettings[layer];
              mesh.renderOrder = settings.renderOrder;
              layers.push(
                createLayerMotion(
                  mesh,
                  {
                    strength: settings.strength * pointerStrength,
                    verticalStrength: settings.verticalStrength * pointerStrength,
                    rotationStrength: settings.rotationStrength * pointerStrength,
                  },
                  reduceMotion
                )
              );
            });
          }
        }

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
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };

    const settlePointer = () => {
      pointerTarget.set(0, 0);
    };

    interactiveArea.addEventListener('pointermove', handlePointerMove, { passive: true });
    interactiveArea.addEventListener('pointerleave', settlePointer);
    window.addEventListener('blur', settlePointer);

    const animate = () => {
      pointerCurrent.lerp(pointerTarget, reduceMotion ? 1 : POINTER_EASE);

      layers.forEach((layer) => {
        const targetPositionX = layer.homePosition.x + pointerCurrent.x * layer.strength;
        const targetPositionY = layer.homePosition.y + pointerCurrent.y * layer.verticalStrength;
        const targetRotationX = layer.homeRotation.x - pointerCurrent.y * layer.rotationStrength * 0.4;
        const targetRotationY = layer.homeRotation.y + pointerCurrent.x * layer.rotationStrength * 0.35;
        const targetRotationZ = layer.homeRotation.z + pointerCurrent.x * layer.rotationStrength;

        layer.object.position.x += (targetPositionX - layer.object.position.x) * layer.positionEase;
        layer.object.position.y += (targetPositionY - layer.object.position.y) * layer.positionEase;
        layer.object.position.z += (layer.homePosition.z - layer.object.position.z) * layer.positionEase;

        layer.object.rotation.x += (targetRotationX - layer.object.rotation.x) * layer.rotationEase;
        layer.object.rotation.y += (targetRotationY - layer.object.rotation.y) * layer.rotationEase;
        layer.object.rotation.z += (targetRotationZ - layer.object.rotation.z) * layer.rotationEase;
      });

      const pivotTargetX = enablePivotTilt ? pointerCurrent.y * 0.008 * pointerStrength : 0;
      const pivotTargetY = enablePivotTilt ? pointerCurrent.x * 0.01 * pointerStrength : 0;
      const pivotEase = reduceMotion ? 1 : PIVOT_EASE;

      pivot.rotation.x += (pivotTargetX - pivot.rotation.x) * pivotEase;
      pivot.rotation.y += (pivotTargetY - pivot.rotation.y) * pivotEase;
      pivot.rotation.z += (0 - pivot.rotation.z) * pivotEase;

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
  }, [
    coverScale,
    enablePivotTilt,
    materialMode,
    modelPath,
    namedLayers,
    offsetX,
    offsetXRatio,
    offsetY,
    offsetYRatio,
    pointerStrength,
    viewportHeight,
  ]);

  return (
    <div className={`${css.scene} ${ready ? css.ready : ''} ${className}`} aria-hidden="true">
      <div ref={mountRef} className={css.canvasMount} />
    </div>
  );
}
