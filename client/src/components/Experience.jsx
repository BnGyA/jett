import {
  ContactShadows,
  Environment,
  Grid,
  Loader,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { charactersAtom, mapAtom, userAtom } from "./SocketManager";
import { useAtom } from "jotai";
import { socket } from "./SocketManager";
import { Suspense, useState } from "react";
import { Item } from "./Item";
import { Mascot } from "./Mascots/Mascot";
import { useThree } from "@react-three/fiber";
import { useGrid } from "../hooks/useGrid";
import { Gameboy } from "./Gameboy";
import MainChar from "./MainChar";
import GithubFloor from "./GithubFloor";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [onFloor, setOnfloor] = useState(false);
  const [user] = useAtom(userAtom);
  const { vector3ToGrid, gridToVector3 } = useGrid();
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

  if (!map) return null;

  return (
    <>
      <Suspense fallback={null}>
        <OrbitControls />
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />

        {map?.items?.map((item, idx) => (
          <>
            {item.notAModel === undefined && (
              <Item key={`${item.name}-${idx}`} item={item} />
            )}
          </>
        ))}
        <mesh
          rotation-x={-Math.PI / 2}
          position-y={-0.001}
          onClick={onCharacterMove}
          onPointerEnter={() => setOnfloor(true)}
          onPointerLeave={() => setOnfloor(false)}
          position-x={map.size[0] / 2}
          position-z={map.size[1] / 2}
        >
          <planeBufferGeometry args={map.size} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        <Gameboy />

        <GithubFloor />
        {/* <MainChar /> */}
        {characters.map((character) => (
          <Mascot
            key={character.id}
            id={character.id}
            path={character.path}
            position={gridToVector3(character.position)}
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.bottomColor}
            model={character.model}
          />
        ))}
        <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />
      </Suspense>
    </>
  );
};
