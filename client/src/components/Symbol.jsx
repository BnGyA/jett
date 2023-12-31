/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Symbol({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Symbols/Symbol.glb");

  const texture = useTexture({
    colorMap: `/models/Symbols/MapPoint_BaseColor.png`,
    roughtnessMap: `/models/Symbols/MapPoint_Roughtness.png`,
  });
  texture.colorMap.flipY = false;

  useFrame(() => {
    group.current.position.y = 0.5 + Math.sin((Date.now() / 1000) * 2) / 10;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.MapPoint.geometry}
        // material={materials.MapPoint}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.007}
      >
        <meshStandardMaterial
          attach="material"
          map={texture.colorMap}
          roughness={texture.roughtnessMap}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Symbols/Symbol.glb");
