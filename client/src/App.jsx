import { Canvas, useFrame } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { Loader } from "@react-three/drei";
import CharacterSelection from "./components/CharacterSelection";
import styled from "styled-components";
import { confirmStatusAtom, dialogAtom } from "./components/SocketManager";
import { useAtom } from "jotai";
import Dialog from "./components/Dialog";

function App() {
  const [confirmStatus] = useAtom(confirmStatusAtom);
  const [dialog] = useAtom(dialogAtom);
  return (
    <>
      {!confirmStatus && <CharacterSelection />}
      <Dialog char={dialog.char} text={dialog.text} active={dialog.active} />
      <SocketManager />
      <Canvas shadows camera={{ position: [20, 0.5, 15], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
