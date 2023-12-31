/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { dialogAtom, userAtom, socket, tpAtom } from "../SocketManager";
import { useAtom } from "jotai";
import { useGrid } from "../../hooks/useGrid";
import { useThree } from "@react-three/fiber";

export default function Arcade({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "./models/TrophiesRoom/Electronic_Game.glb"
  );

  const [_tp, setTp] = useAtom(tpAtom);
  const scene = useThree((state) => state.scene);
  const [user] = useAtom(userAtom);

  const { vector3ToGrid } = useGrid();

  const handleClick = (e) => {
    const character = scene.getObjectByName(`character-${user}`);
    const vec = new Vector3();
    vec.set(9, 0, 9);
    socket.emit("move", vector3ToGrid(character.position), vector3ToGrid(vec));

    e.stopPropagation();
    setTp({
      active: true,
      github: tpAtom.github,
      project: tpAtom.project,
    });
  };

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <group rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[7.5, 0, 8]}>
        <group
          position={[-0.11, -0.77, 0]}
          rotation={[-Math.PI / 2, Math.PI / 6, 0]}
        >
          <mesh
            geometry={nodes.Cylinder449_1.geometry}
            material={materials.black}
          />
          <mesh
            geometry={nodes.Cylinder449_2.geometry}
            material={materials.metal}
          />
        </group>
        <mesh
          geometry={nodes.Line166.geometry}
          material={materials.black}
          position={[0.02, -0.19, 0]}
        />
        <mesh
          geometry={nodes.gamemachine_01_1.geometry}
          material={materials.black}
          castShadow
        />
        <mesh
          geometry={nodes.gamemachine_01_2.geometry}
          material={materials.blue}
          castShadow
        />
        <mesh
          geometry={nodes.gamemachine_01_3.geometry}
          material={materials.screen}
          castShadow
        />
        <mesh
          geometry={nodes.gamemachine_01_4.geometry}
          material={materials.red}
        />
        <mesh
          geometry={nodes.gamemachine_01_5.geometry}
          material={materials.orange}
        />
        <mesh
          geometry={nodes.Text001.geometry}
          material={materials.orange}
          position={[0.39, -0.38, 1.03]}
          rotation={[1.3, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/TrophiesRoom/Electronic_Game.glb");
