import { Text3D } from "@react-three/drei";
import Diplo from "./Diplo";

const TimeLineRoom = () => {
  return (
    <>
      <Diplo position={[104, 0.7, 15]} />
      <Text3D
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.05}
        height={0.1}
        lineHeight={0.5}
        letterSpacing={0}
        size={0.5}
        font="/Inter_Bold.json"
        position={[110, 0.1, 18]}
        castShadow
        rotation={[0, Math.PI / 2, 0]}
      >
        DiploStudio
        <meshStandardMaterial color={"#5164a8"} />
      </Text3D>
      <Text3D
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.05}
        height={0.1}
        lineHeight={0.5}
        letterSpacing={0}
        size={0.3}
        font="/Inter_Bold.json"
        position={[105, 0.1, 17]}
        castShadow
        rotation={[0, Math.PI / 2, 0]}
      >
        2015-2016
        <meshStandardMaterial color={"#5164a8"} />
      </Text3D>
    </>
  );
};

export default TimeLineRoom;
