import { Environment, Grid, OrbitControls } from "@react-three/drei";
import {
  charactersAtom,
  mapAtom,
  socket,
  tpAtom,
  userAtom,
} from "./SocketManager";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { Item } from "./Item";
import { Mascot } from "./Mascots/Mascot";
import { useFrame, useThree } from "@react-three/fiber";
import MainChar from "./MainChar";
import Map from "./Map";
import { useGrid } from "../hooks/useGrid";
import TrophiesRoom from "./Trophies/TrophiesRoom";
import GithubRoom from "./GithubRoom/GithubRoom";

export const Experience = ({ debug }) => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const { gridToVector3 } = useGrid();

  const [tp] = useAtom(tpAtom);
  const scene = useThree((state) => state.scene);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (tp.teleportingTo !== null) {
      const character = scene.getObjectByName(`character-${user}`);
      if (!character) return;
      socket.emit("teleport", tp.coords);
    }
  }, [tp]);

  if (!map) return null;
  useFrame((state) => {
    if (!debug) {
      state.camera.lookAt(20, 0.25, 20);
    }
  });
  return (
    <>
      <Suspense fallback={null}>
        <OrbitControls />

        <Environment preset="sunset" />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[-4, 4, -4]}
          intensity={0.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach={"shadow-camera"}
            args={[-map.size[0], map.size[1], 50, -50]}
            far={map.size[0] + map.size[1]}
          />
        </directionalLight>

        {map?.items?.map((item, idx) => (
          <>
            {item.notAModel === undefined && (
              <Item key={`${item.name}-${idx}`} item={item} />
            )}
            <>
              {item.notAModel === false && (
                <Item key={`${item.name}-${idx}`} item={item} />
              )}
            </>
          </>
        ))}
        <Map />
        {/* <Gameboy /> */}

        <MainChar />
        <TrophiesRoom />
        <GithubRoom />
        {!debug && (
          <>
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
          </>
        )}

        <Grid infiniteGrid fadeDistance={100} fadeStrength={5} />
      </Suspense>
    </>
  );
};
