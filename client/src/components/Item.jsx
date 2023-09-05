import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { mapAtom } from "./SocketManager";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useMemo } from "react";

export const Item = ({ item }) => {
  const { name, gridPosition, size, rotation, cube } = item;
  const [map] = useAtom(mapAtom);
  const { scene } = useGLTF(`/models/items/${name}.glb`);
  // Skinned mesh cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clone]);

  return (
    <primitive
      object={clone}
      position={[
        width / map.gridDivision / 2 + gridPosition[0] / map.gridDivision,
        0,
        height / map.gridDivision / 2 + gridPosition[1] / map.gridDivision,
      ]}
      rotation-y={((rotation || 0) * Math.PI) / 2}
      scale-x={cube ? size[0] / map.gridDivision : 1}
      scale-z={cube ? size[1] / map.gridDivision : 1}
    />
  );
};
