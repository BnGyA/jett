/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./models/TimeLine/Elium.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.pSphere16_1.geometry}
        material={materials.blinn6SG}
      />
      <mesh
        geometry={nodes.pSphere16_1_1.geometry}
        material={materials.blinn7SG}
      />
      <mesh
        geometry={nodes.pSphere16_1_2.geometry}
        material={materials.blinn10SG}
      />
    </group>
  );
}

useGLTF.preload("./models/TimeLine/Elium.glb");
