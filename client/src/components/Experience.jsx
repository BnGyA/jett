import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { charactersAtom } from "./SocketManager";
import { useAtom } from "jotai";
import { socket } from "./SocketManager";
import { useState } from "react";
import * as THREE from "three";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnfloor] = useState(false);

  useCursor(onFloor);

  console.log(characters[0].position);
  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />

      <ContactShadows blur={2} />
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnfloor(true)}
        onPointerLeave={() => setOnfloor(false)}
      >
        <planeBufferGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character) => (
        <AnimatedWoman
          key={character.id}
          position={
            new THREE.Vector3(
              character.position[0],
              character.position[1],
              character.position[2]
            )
          }
          hairColor={character.hairColor}
          topColor={character.topColor}
          bottomColor={character.bottomColor}
        />
      ))}
    </>
  );
};
