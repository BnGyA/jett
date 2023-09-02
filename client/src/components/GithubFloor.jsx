import { githubContribAtom } from "./SocketManager";
import { useAtom } from "jotai";

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
  let calculatedDayNum;
  return weekday + monthNum * 5;
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
  return weekNum + calculatedMonthNum * 7;
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
  const dateSplitted = day.date.split("-");
  const monthNum = dateSplitted[1];

  return (
    <mesh
      position={[
        calculateYCoord(removeLeadingZeroFromNumber(monthNum), day.weekday),
        calculatedContrib(day.contributionLevel) / 2,
        calculateZCoord(
          removeLeadingZeroFromNumber(monthNum),
          getWeekNumber(day.date)
        ),
      ]}
      onClick={() => console.log(day.date)}
    >
      <boxBufferGeometry
        args={[0.5, calculatedContrib(day.contributionLevel), 0.5]}
      />
      <meshStandardMaterial
        color={day.contributionLevel === "NONE" ? "#39d353" : "#40c463"}
      />
    </mesh>
  );
};

const Week = ({ week }) => {
  return (
    <group position={[0, 0, 0]}>
      {week.contributionDays.map((day) => (
        <Box day={day} />
      ))}
    </group>
  );
};

const GithubFloor = () => {
  const [githubContrib] = useAtom(githubContribAtom);
  const githubContribWeeks =
    githubContrib[0].data.user.contributionsCollection.contributionCalendar
      .weeks;

  return (
    <group scale={[0.2, 0.2, 0.2]} position={[20, 0, 20]} rotation-y={Math.PI}>
      {githubContribWeeks.map((week, weekIndex) => (
        <Week week={week} weekIndex={weekIndex} />
      ))}
    </group>
  );
};

export default GithubFloor;
