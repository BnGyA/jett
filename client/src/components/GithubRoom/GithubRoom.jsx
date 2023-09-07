import GithubFloor from "./GithubFloor";
import { useAtom } from "jotai";
import { tpAtom, gameStateAtom } from "../SocketManager";
import Symbol from "../Symbol";
import Github from "../Trophies/Github";
import { useControls } from "leva";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const GithubRoom = () => {
  const [tp, setTp] = useAtom(tpAtom);
  const [{ debug }, set] = useControls(() => ({ debug: true }));
  const [gameStateLocal, setGameStateLocal] = useAtom(gameStateAtom);
  const teleport = () => {
    setTp({
      ...tp,
      active: false,
      teleportingTo: [0, 0],
      teleporting: true,
      room: "intro",
      coords: [10, 10],
    });
    setTimeout(() => {
      set({ debug: true });
    }, 100);
    setTimeout(() => {
      set({ debug: false });
    }, 200);
    setGameStateLocal({
      ...gameStateLocal,
      github: true,
    });
  };
  return (
    <>
      <>
        <GithubFloor />

        <group onClick={() => teleport()}>
          <Symbol position={[43, 0.5, 9]} />
          <Github position={[43, -1, 9]} />
        </group>
      </>
    </>
  );
};

export default GithubRoom;
