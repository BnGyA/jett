import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { Loader } from "@react-three/drei";
import CharacterSelection from "./components/CharacterSelection";
import styled from "styled-components";
import { confirmStatusAtom } from "./components/SocketManager";
import { useAtom } from "jotai";

function App() {
  const [confirmStatus] = useAtom(confirmStatusAtom);
  return (
    <>
      {!confirmStatus && <CharacterSelection />}

      <SocketManager />
      <Canvas shadows camera={{ position: [0, 1, 18], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
