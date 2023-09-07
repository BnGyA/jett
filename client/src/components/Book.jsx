/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Book({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./models/book.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.55}>
        <mesh geometry={nodes.model_1.geometry} material={materials.mat5}>
          <meshStandardMaterial color={props.color} />
        </mesh>
        <mesh
          geometry={nodes.model_2.geometry}
          material={materials.mat21}
        ></mesh>
      </group>
    </group>
  );
}

useGLTF.preload("./models/book.glb");