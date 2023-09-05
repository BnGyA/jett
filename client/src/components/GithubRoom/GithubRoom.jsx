import GithubFloor from "./GithubFloor";
import { useAtom } from "jotai";
import { tpAtom } from "../SocketManager";
import Symbol from "../Symbol";
import Github from "../Trophies/Github";

const GithubRoom = () => {
  const [tp] = useAtom(tpAtom);
  return (
    <>
      {tp.room === "github" && (
        <>
          <GithubFloor />
          <Symbol position={[43, 0.5, 9]} />
          <Github position={[43, -1, 9]} />
        </>
      )}
    </>
  );
};

export default GithubRoom;
