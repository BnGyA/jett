import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { Loader } from "@react-three/drei";
import {
  confirmStatusAtom,
  dialogAtom,
  tpAtom,
} from "./components/SocketManager";
import { useAtom } from "jotai";
import Dialog from "./components/Dialog";
import { useControls } from "leva";
import CharacterSelection from "./components/CharacterSelection";
import TP from "./components/TP";
import "./fonts.css";

function App() {
  const [confirmStatus] = useAtom(confirmStatusAtom);
  const [dialog] = useAtom(dialogAtom);
  const [tp] = useAtom(tpAtom);
  const { debug } = useControls({ debug: true });
  return (
    <>
      {!confirmStatus && !debug && <CharacterSelection />}
      {tp.active && <TP />}
      <Dialog char={dialog.char} text={dialog.text} active={dialog.active} />
      <SocketManager />
      <Canvas shadows camera={{ position: [30, 0.5, 25], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience debug={debug} />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
