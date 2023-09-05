import { useGrid } from "../hooks/useGrid";
import { useAtom } from "jotai";
import { userAtom } from "./SocketManager";
import { socket } from "./SocketManager";
import { useCursor } from "@react-three/drei";
import { mapAtom } from "./SocketManager";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

const Map = () => {
  const [onFloor, setOnfloor] = useState(false);
  const [user] = useAtom(userAtom);
  const [map] = useAtom(mapAtom);

  const { vector3ToGrid } = useGrid();
  useCursor(onFloor);

  const scene = useThree((state) => state.scene);

  const onCharacterMove = (e) => {
    const character = scene.getObjectByName(`character-${user}`);
    if (!character) return;
    socket.emit(
      "move",
      vector3ToGrid(character.position),
      vector3ToGrid(e.point)
    );
  };
  return (
    <group
      onClick={onCharacterMove}
      onPointerEnter={() => setOnfloor(true)}
      onPointerLeave={() => setOnfloor(false)}
    >
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
        receiveShadow
      >
        <planeBufferGeometry args={map.size} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        receiveShadow
        position={[10, 0, -2]}
      >
        <planeBufferGeometry args={[4, 4]} />
        <meshStandardMaterial color="#FFF000" />
      </mesh>
    </group>
  );
};

export default Map;
