import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import {
  userAtom,
  releasedCameraAtom,
  releasingCameraAtom,
} from "../SocketManager";
import { useAtom } from "jotai";
import { useGrid } from "../../hooks/useGrid";
import { useTexture } from "@react-three/drei";
import { Vector3 } from "three";

const MOUVEMENT_SPEED = 0.062;

export function Mascot({ id, model, hairColor, ...props }) {
  const texture = useTexture({
    colorMap: `/models/textures/${model.id}/Mascot_BaseColor.png`,
    roughtnessMap: `/models/textures/${model.id}/Mascot_Roughtness.png`,
  });
  texture.colorMap.flipY = false;

  const position = useMemo(() => props.position, []);
  const [path, setPath] = useState();
  const { gridToVector3 } = useGrid();
  const group = useRef();

  useEffect(() => {
    const path = [];
    props.path?.forEach((gridPosition) => {
      path.push(gridToVector3(gridPosition));
    });
    setPath(path);
  }, [props.path]);

  const { scene, materials, animations } = useGLTF(
    `/models/Mascot-${model.id}.glb`
  );
  // Skinned mesh cannot be re-used in threejs without cloning them
  let clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("Idle");

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation, actions]);

  useEffect(() => {
    console.log("change model", model.id);
    setAnimation("Idle");
    (clone = SkeletonUtils.clone(scene)), [scene];
  }, [model.id]);

  // used to follow the user with the camera
  const [user] = useAtom(userAtom);
  const [releasedCamera] = useAtom(releasedCameraAtom);
  const [releasingCamera] = useAtom(releasingCameraAtom);

  useFrame((state) => {
    if (path?.length && group.current.position.distanceTo(path[0]) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(path[0])
        .normalize()
        .multiplyScalar(MOUVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(path[0]);
      setAnimation("Run");
    } else if (path?.length) {
      path.shift();
    } else {
      setAnimation("Idle");
    }
    if (releasingCamera) {
      const vec = new Vector3();

      state.camera.position.lerp(
        vec.set(
          group.current.position.x + 8,
          group.current.position.y + 8,
          group.current.position.z + 8
        ),
        0.05
      );
      state.camera.lookAt(group.current.position);
    }
    if (id === user && releasedCamera) {
      // 8 is the default camera position, this is used to follow the user
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.y = group.current.position.y + 8;
      state.camera.position.z = group.current.position.z + 8;
      state.camera.lookAt(group.current.position);
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={position}
      name={`character-${id}`}
      onPointerEnter={() => setAnimation("Run")}
      onPointerLeave={() => setAnimation("Idle")}
    >
      <group name="Scene">
        <group
          name="Base_HumanLPlatform"
          position={[0.07, 0, 0.01]}
          rotation={[-Math.PI, 0, -Math.PI / 2]}
          scale={0.01}
        />
        <group
          name="Base_HumanRPlatform"
          position={[-0.07, 0, 0.01]}
          rotation={[-Math.PI, 0, -Math.PI / 2]}
          scale={0.01}
        />
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.Base_Human} />
          <primitive object={nodes.Base_HumanPelvis} />
          {model.id === 1 && (
            <skinnedMesh
              name="Character266"
              geometry={nodes.Character266.geometry}
              skeleton={nodes.Character266.skeleton}
            >
              <meshStandardMaterial
                attach="material"
                map={texture.colorMap}
                roughness={texture.roughtnessMap}
              />
            </skinnedMesh>
          )}
          {model.id === 2 && (
            <skinnedMesh
              name="Character179_RiggedMascot"
              geometry={nodes.Character179_RiggedMascot.geometry}
              skeleton={nodes.Character179_RiggedMascot.skeleton}
            >
              <meshStandardMaterial
                attach="material"
                map={texture.colorMap}
                roughness={texture.roughtnessMap}
              />
            </skinnedMesh>
          )}
          {model.id === 3 && (
            <skinnedMesh
              name="Character254"
              geometry={nodes.Character254.geometry}
              skeleton={nodes.Character254.skeleton}
            >
              <meshStandardMaterial
                attach="material"
                map={texture.colorMap}
                roughness={texture.roughtnessMap}
              />
            </skinnedMesh>
          )}
          {model.id === 4 && (
            <skinnedMesh
              name="Character247"
              geometry={nodes.Character247.geometry}
              skeleton={nodes.Character247.skeleton}
            >
              <meshStandardMaterial
                attach="material"
                map={texture.colorMap}
                roughness={texture.roughtnessMap}
              />
            </skinnedMesh>
          )}
          {model.id === 5 && (
            <skinnedMesh
              name="Character249"
              geometry={nodes.Character249.geometry}
              skeleton={nodes.Character249.skeleton}
            >
              <meshStandardMaterial
                attach="material"
                map={texture.colorMap}
                roughness={texture.roughtnessMap}
              />
            </skinnedMesh>
          )}
          {model.id === 6 && (
            <skinnedMesh
              name="Character265"
              geometry={nodes.Character265.geometry}
              skeleton={nodes.Character265.skeleton}
            >
              <meshStandardMaterial
                attach="material"
                map={texture.colorMap}
                roughness={texture.roughtnessMap}
              />
            </skinnedMesh>
          )}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload();
