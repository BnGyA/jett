import Arcade from "./Arcade";
import Github from "./Github";
import { useAtom } from "jotai";
import { gameStateAtom } from "../SocketManager";

const TrophiesRoom = () => {
  const [gameStateLocal] = useAtom(gameStateAtom);

  return (
    <>
      <Arcade position={[0, 0, 0]} />
      {gameStateLocal.github && (
        <Github
          position={[1.7, 1.6, 1.75]}
          animated
          rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        />
      )}
    </>
  );
};

export default TrophiesRoom;
