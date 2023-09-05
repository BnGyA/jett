import Arcade from "./Arcade";
import Github from "./Github";

const TrophiesRoom = () => {
  return (
    <>
      <Arcade position={[0, 0, 0]} />
      <Github
        position={[2.5, 0.5, 2.53]}
        animated
        rotation={[Math.PI / 2, 0, -Math.PI / 4]}
      />
    </>
  );
};

export default TrophiesRoom;
