import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { userAtom } from "./SocketManager";
import { useAtom } from "jotai";
import { useGrid } from "../hooks/useGrid";

const MOUVEMENT_SPEED = 0.12;

export function Boy({ id, ...props }) {
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

  const { scene, materials, animations } = useGLTF("/models/Boy.glb");
  // Skinned mesh cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("Idle");

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation, actions]);

  // used to follow the user with the camera
  const [user] = useAtom(userAtom);

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
    if (id === user) {
      // 8 is the default camera position, this is used to follow the user
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.y = group.current.position.y + 8;
      state.camera.position.z = group.current.position.z + 8;
      state.camera.lookAt(group.current.position);
    }
  });

  return (
    <group
      ref={group}
      dispose={null}
      name={`character-${id}`}
      position={position}
      {...props}
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
          <group name="Character170_RiggedLittleMan_Max">
            <skinnedMesh
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={materials.Character170_RiggedLittleMan_Max}
              skeleton={nodes.Mesh.skeleton}
            />
            <skinnedMesh
              name="Mesh_1"
              geometry={nodes.Mesh_1.geometry}
              material={materials["Material #2"]}
              skeleton={nodes.Mesh_1.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Boy.glb");
