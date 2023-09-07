import { Instance, Instances, Text, Text3D } from "@react-three/drei";
import { githubContribAtom } from "../SocketManager";
import { useAtom } from "jotai";
import * as THREE from "three";
import { useRef } from "react";

const material = new THREE.MeshStandardMaterial({ color: "#40c463" });
const material2 = new THREE.MeshStandardMaterial({ color: "#39d353" });
function getWeekNumber(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  // Find the first day of the month
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  // Calculate the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();

  // Calculate the day of the month for the provided date
  const dayOfMonth = date.getDate();

  // Calculate the week number by dividing the sum of firstDayOfWeek and dayOfMonth by 7 and rounding up
  const weekNumber = Math.ceil((firstDayOfWeek + dayOfMonth) / 7);

  return weekNumber;
}

function removeLeadingZeroFromNumber(num) {
  let numStr = num.toString();
  if (numStr.charAt(0) === "0") {
    numStr = numStr.substring(1);
  }
  return parseFloat(numStr);
}

const calculateYCoord = (monthNum, weekday) => {
  // - 30 for the instancedMesh to not be hidden
  return weekday + monthNum * 5 - 30;
};

const calculateZCoord = (monthNum, weekNum) => {
  let calculatedMonthNum;
  if (monthNum === 1 || monthNum === 2 || monthNum === 3) {
    calculatedMonthNum = monthNum;
  } else if (monthNum === 4 || monthNum === 5 || monthNum === 6) {
    calculatedMonthNum = monthNum - 3;
  } else if (monthNum === 7 || monthNum === 8 || monthNum === 9) {
    calculatedMonthNum = monthNum - 6;
  } else if (monthNum === 10 || monthNum === 11 || monthNum === 12) {
    calculatedMonthNum = monthNum - 9;
  }
  return weekNum + calculatedMonthNum * 12 - 5 - 5;
};

const calculatedContrib = (contributionLevel) => {
  if (contributionLevel === "FIRST_QUARTILE") {
    return 1;
  } else if (contributionLevel === "SECOND_QUARTILE") {
    return 2;
  } else if (contributionLevel === "THIRD_QUARTILE") {
    return 3;
  } else if (contributionLevel === "FOURTH_QUARTILE") {
    return 4;
  } else {
    return 0.01;
  }
};

const Box = ({ day }) => {
  const ref = useRef();
  //   if (!ref.current) return null;

  if (ref.current) {
    const dateSplitted = day.date.split("-");
    const monthNum = dateSplitted[1];
    ref.current.scale.y = calculatedContrib(day.contributionLevel);

    ref.current.position.x = calculateYCoord(
      removeLeadingZeroFromNumber(monthNum),
      day.weekday
    );
    ref.current.position.y = calculatedContrib(day.contributionLevel) / 2;
    ref.current.position.z = calculateZCoord(
      removeLeadingZeroFromNumber(monthNum),
      getWeekNumber(day.date)
    );
  }
  return <Instance ref={ref} />;
};

const Week = ({ week }) => {
  const ref = useRef();

  return (
    <Instances
      limit={week.contributionDays.length}
      ref={ref}
      position={[30, 0, 5]}
      range={7}
    >
      <boxBufferGeometry args={[0.5, 4, 0.5]} />
      <meshStandardMaterial color="#39d353" />
      {week.contributionDays.map((day, i) => (
        <Box key={i} day={day} />
      ))}
    </Instances>
  );
};

const months = [
  {
    position: [10, 1, 15],
    id: "January",
  },
  {
    position: [14, 1, 26.5],
    id: "February",
  },
  {
    position: [18, 1, 38],
    id: "March",
  },
  {
    position: [24, 1, 15],
    id: "April",
  },
  {
    position: [29, 1, 26.5],
    id: "May",
  },
  {
    position: [34, 1, 38],
    id: "June",
  },
  {
    position: [39, 1, 15],
    id: "July",
  },
  {
    position: [44, 1, 26.5],
    id: "August",
  },
  {
    position: [49, 1, 38],
    id: "September",
  },
  {
    position: [54, 1, 15],
    id: "October",
  },
  {
    position: [59, 1, 26.5],
    id: "November",
  },
  {
    position: [64, 1, 38.5],
    id: "December",
  },
];

const GithubFloor = () => {
  const [githubContrib] = useAtom(githubContribAtom);
  if (!githubContrib[0]) return null;
  const githubContribWeeks =
    githubContrib[0].data.user?.contributionsCollection.contributionCalendar
      .weeks;

  return (
    <>
      <group scale={[0.18, 0.18, 0.18]} position={[35.5, 0, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={1.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={5.5}
          font="/Inter_Bold.json"
          position={[20, 1, 1]}
          castShadow
          material={material}
        >
          @BnGyA
        </Text3D>

        {githubContribWeeks.map((week, weekIndex) => (
          <Week week={week} weekIndex={weekIndex} />
        ))}
        {months.map((month) => (
          <Text color="black" position={month.position}>
            {month.id}
          </Text>
        ))}
      </group>
    </>
  );
};

export default GithubFloor;
