import { Text3D } from "@react-three/drei";
import Diplo from "./Diplo";
import Webstanz from "./Webstanz";
import Elium from "./Elium";
import Oncodna from "./Oncodna";
const TimeLineRoom = () => {
  const experiences = [
    {
      year: "2015-2016",
      title: "WebStanZ",
      color: "#4b3b77",
    },
    {
      year: "2015-2017",
      title: "DiploStudio",
      color: "#777798",
    },
    {
      year: "2017-2021",
      title: "OncoDNA",
      color: "#0a6ea2",
    },
    {
      year: "2021-...",
      title: "Elium",
      color: "#e76f5e",
    },
  ];
  return (
    <>
      <Diplo position={[104, 0.7, 7.5]} />
      <Webstanz
        position={[104, 0.2, 3]}
        scale={[3, 3, 3]}
        rotation-y={[Math.PI / 2]}
      />

      <Oncodna
        position={[104, 0.2, 13]}
        scale={[3, 3, 3]}
        rotation-y={[Math.PI / 2]}
      />

      <Elium
        position={[104, 0.2, 18]}
        scale={[0.005, 0.005, 0.005]}
        rotation-x={[-Math.PI / 2]}
      />

      {experiences.map((experience, i) => (
        <>
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
            position={[110, 0.1, 5 + i * 4.8]}
            castShadow
            rotation={[0, Math.PI / 2, 0]}
          >
            {experience.title}
            <meshStandardMaterial color={experience.color} />
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
            position={[105, 0.1, 4 + i * 5]}
            castShadow
            rotation={[0, Math.PI / 2, 0]}
          >
            {experience.year}
            <meshStandardMaterial color={experience.color} />
          </Text3D>
        </>
      ))}
    </>
  );
};

export default TimeLineRoom;
