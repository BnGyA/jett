import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { Loader, PerformanceMonitor, Stats } from "@react-three/drei";
import {
  confirmStatusAtom,
  dialogAtom,
  tpAtom,
  gameStateAtom,
} from "./components/SocketManager";
import { useAtom } from "jotai";
import Dialog from "./components/Dialog";
import { useControls, Leva } from "leva";
import CharacterSelection from "./components/CharacterSelection";
import TP from "./components/TP";
import "./fonts.css";
import { Suspense, useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [confirmStatus] = useAtom(confirmStatusAtom);
  const [dialog] = useAtom(dialogAtom);
  const [tp] = useAtom(tpAtom);
  const { debug } = useControls({ debug: false });
  const [dpr, setDpr] = useState(1.5);
  const [gameState, setGameState] = useLocalStorage("gameState");
  const [_gameStateLocal, setGameStateLocal] = useAtom(gameStateAtom);

  useEffect(() => {
    if (!gameState) {
      setGameState({
        github: false,
        project: false,
        instagram: false,
        charBuilder: false,
        timeline: false,
      });
    } else {
      setGameStateLocal(gameState);
    }
  }, [gameState, setGameState, setGameStateLocal]);

  return (
    <>
      {!confirmStatus && !debug && <CharacterSelection />}
      {tp.active && <TP />}
      <Dialog char={dialog.char} text={dialog.text} active={dialog.active} />
      <SocketManager />
      <Stats showPanel={0} className="stats" />
      <Suspense fallback={null}>
        <Canvas
          dpr={dpr}
          shadows
          camera={{
            position: [40, 0.5, 40],
            fov: 30,
          }}
          performance={{ min: 0.5 }}
        >
          {/* <Leva hidden={false} /> */}
          <color attach="background" args={["#ececec"]} />
          <Experience debug={debug} />
          <PerformanceMonitor
            onIncline={() => setDpr(2)}
            onDecline={() => setDpr(1)}
          />
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
