import { useGrid } from "../hooks/useGrid";
import { useAtom } from "jotai";
import { releasedCameraAtom, userAtom } from "./SocketManager";
import { socket } from "./SocketManager";
import { useCursor } from "@react-three/drei";
import { mapAtom } from "./SocketManager";
import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";

const Map = ({ cameraRef, debug }) => {
  const [onFloor, setOnfloor] = useState(false);
  const [user] = useAtom(userAtom);
  const [map] = useAtom(mapAtom);
  const [releasedCamera] = useAtom(releasedCameraAtom);
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

  const Bridge = [0, 1, 2, 3, 4, 5, 6];

  useFrame((state) => {
    if (!releasedCamera && !debug) {
      cameraRef.current.setLookAt(25, 0.5, 25, 30, 0.5, 30);
    }
  });

  return (
    <group
      onClick={onCharacterMove}
      onPointerEnter={() => setOnfloor(true)}
      onPointerLeave={() => setOnfloor(false)}
    >
      {/* Trophy room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={6}
        position-z={6}
        receiveShadow
      >
        <planeBufferGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* INTRO room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={24}
        position-z={24}
        receiveShadow
      >
        <planeBufferGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Bridge */}
      <group>
        {Bridge.map((i) => (
          <group key={i}>
            <mesh
              rotation-x={-Math.PI / 2}
              position-y={-0.001}
              position-x={17.5 - i}
              position-z={17.5 - i}
              receiveShadow
            >
              <planeBufferGeometry args={[1, 1]} />
              <meshStandardMaterial color="#f0f0f0" />
            </mesh>
            <mesh
              rotation-x={-Math.PI / 2}
              position-y={-0.001}
              position-x={18.5 - i}
              position-z={17.5 - i}
              receiveShadow
            >
              <planeBufferGeometry args={[1, 1]} />
              <meshStandardMaterial color="#f0f0f0" />
            </mesh>
            <mesh
              rotation-x={-Math.PI / 2}
              position-y={-0.001}
              position-x={17.5 - i}
              position-z={18.5 - i}
              receiveShadow
            >
              <planeBufferGeometry args={[1, 1]} />
              <meshStandardMaterial color="#f0f0f0" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Github room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={42}
        position-z={6}
        receiveShadow
      >
        <planeBufferGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* CharBuild room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={57}
        position-z={29}
        receiveShadow
      >
        <planeBufferGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Project room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={70}
        position-z={6}
        receiveShadow
      >
        <planeBufferGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Instragram room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={86}
        position-z={29}
        receiveShadow
      >
        <planeBufferGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Timeline room */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={107.5}
        position-z={10}
        receiveShadow
      >
        <planeBufferGeometry args={[3, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Debug */}
      {/* <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.01}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
        receiveShadow
      >
        <planeBufferGeometry args={map.size} />
        <meshStandardMaterial color="red" />
      </mesh> */}
    </group>
  );
};

export default Map;
