import { Environment, Grid } from "@react-three/drei";
import { charactersAtom, mapAtom } from "./SocketManager";
import { useAtom } from "jotai";
import { Suspense } from "react";
import { Item } from "./Item";
import { Mascot } from "./Mascots/Mascot";
import { useFrame } from "@react-three/fiber";
import { Gameboy } from "./Gameboy";
import MainChar from "./MainChar";
import GithubFloor from "./GithubFloor";
import Map from "./Map";
import { useGrid } from "../hooks/useGrid";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const { gridToVector3 } = useGrid();

  if (!map) return null;
  useFrame((state) => {
    state.camera.lookAt(20, 0.25, 20);
  });
  return (
    <>
      <Suspense fallback={null}>
        {/* <OrbitControls /> */}
        <Environment preset="sunset" />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[-4, 4, -4]}
          intensity={0.35}
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach={"shadow-camera"}
            args={[-map.size[0], map.size[1], 20, -20]}
            far={map.size[0] + map.size[1]}
          />
        </directionalLight>

        {map?.items?.map((item, idx) => (
          <>
            {item.notAModel === undefined && (
              <Item key={`${item.name}-${idx}`} item={item} />
            )}
          </>
        ))}
        <Map />
        <Gameboy />
        <GithubFloor />
        <MainChar />

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
