/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Computer({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./models/computer.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={2}>
        <mesh
          geometry={nodes.laptop_2.geometry}
          material={materials.metalDark}
        />
        <mesh geometry={nodes.laptop_2_1.geometry} material={materials.metal} />
        <mesh
          geometry={nodes.laptop_2_2.geometry}
          material={materials.metalMedium}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/computer.glb");