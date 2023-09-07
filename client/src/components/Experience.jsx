import { CameraControls, Environment, Grid } from "@react-three/drei";
import {
  charactersAtom,
  mapAtom,
  releasedCameraAtom,
  socket,
  tpAtom,
  userAtom,
} from "./SocketManager";
import { useAtom } from "jotai";
import { Suspense, useEffect, useRef } from "react";
import { Item } from "./Item";
import { Mascot } from "./Mascots/Mascot";
import { useThree } from "@react-three/fiber";
import MainChar from "./MainChar";
import Map from "./Map";
import { useGrid } from "../hooks/useGrid";
import TrophiesRoom from "./Trophies/TrophiesRoom";
import GithubRoom from "./GithubRoom/GithubRoom";
import TimeLineRoom from "./TimeLineRoom/TimeLineRoom";
import Computer from "./Computer";
import Book from "./Book";

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

  const cameraControlsRef = useRef();

  if (!map) return null;

  return (
    <>
      <Suspense fallback={null}>
        {/* <OrbitControls /> */}
        <CameraControls
          ref={cameraControlsRef}
          minDistance={1}
          enabled={true}
          maxDistance={100}
        />

        <Environment preset="sunset" />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[-4, 4, -4]}
          intensity={0.5}
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
        <Map cameraRef={cameraControlsRef} debug={debug} />
        <MainChar />
        <Computer position={[24.35, 0.15, 24.35]} rotation-y={Math.PI / 4} />
        <Book
          position={[24.35, 0, 24.35]}
          rotation-y={-Math.PI / 5}
          color="#e1ad01"
        />
        <Book
          position={[24.35, 0.07, 24.35]}
          rotation-y={Math.PI}
          color="#73a580"
        />
        <TrophiesRoom />
        <TimeLineRoom />
        <GithubRoom />
        {!debug && (
          <>
            {characters.map((character) => (
              <Mascot
                key={character.id}
                id={character.id}
                path={character.path}
                position={gridToVector3(character.position)}
                model={character.model}
                cameraRef={cameraControlsRef}
              />
            ))}
          </>
        )}

        <Grid infiniteGrid fadeDistance={240} fadeStrength={5} />
      </Suspense>
    </>
  );
};
