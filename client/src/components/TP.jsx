import { useCallback, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { tpAtom } from "./SocketManager";
import { useAtom } from "jotai";

const blinkerAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const Title = styled.h1`
  font-family: "Inter", sans-serif;
  color: #96b8de;
  font-family: "SuperLegendBoy";
  color: #fff;
  font-size: 3rem;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-image: url("./neon.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &::before {
    background: rgba(0, 0, 0, 0.5);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
  }
`;

const GameTitle = styled.p`
  font-family: "SuperLegendBoy";
  color: #fff;
  position: relative;
  font-size: 2rem;

  ${(props) =>
    props.active &&
    css`
      animation: ${blinkerAnimation} 1s linear infinite;
    `}
`;

const GameTitles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Cursor = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  display: none;
  ${(props) =>
    props.active &&
    css`
      display: block;
      animation: ${blinkerAnimation} 1s linear infinite;
    `}
`;

const TP = () => {
  const [titles, setTitles] = useState([
    { name: "Github's floor", active: true, coords: [39, 10], room: "github" },
    { name: "Projects Room", active: false },
    { name: "Instagram expo", active: false },
    { name: "Developer Info", active: false },
    {
      name: "THE Timeline",
      active: false,
      coords: [108, 20],
      room: "timeline",
    },
  ]);
  const [_tp, setTp] = useAtom(tpAtom);

  const handleKeyPress = useCallback((event) => {
    const activeIndex = titles.findIndex((title) => title.active);
    console.log(activeIndex);
    const updatedTitles = [...titles];
    if (event.key === "Enter") {
      setTp({ ..._tp, active: false, room: titles[activeIndex].room });
      setTimeout(() => {
        setTp({
          ..._tp,
          active: false,
          teleportingTo: [0, 0],
          room: titles[activeIndex].room,
          coords: titles[activeIndex].coords,
        });
      }, 100);
    }
    if (event.key === "ArrowDown") {
      console.log("ArrowDown key pressed");
      // Deactivate the current active item
      updatedTitles[activeIndex].active = false;
      // Calculate the index of the next item (loop back to 0 if at the end)
      const nextIndex = (activeIndex + 1) % titles.length;
      // Activate the next item
      updatedTitles[nextIndex].active = true;
      setTitles(updatedTitles);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      // Deactivate the current active item
      updatedTitles[activeIndex].active = false;
      // Calculate the index of the previous item (loop back to the last item if at the beginning)
      const prevIndex = activeIndex === 0 ? titles.length - 1 : activeIndex - 1;
      // Activate the previous item
      updatedTitles[prevIndex].active = true;
      setTitles(updatedTitles);
    }
  });

  const handleMouseEnter = (index) => {
    const updatedTitles = titles.map((title, i) => ({
      ...title,
      active: i === index,
    }));
    setTitles(updatedTitles);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [titles, handleKeyPress]);

  return (
    <Container>
      <GameTitles>
        <Title>Select your room</Title>

        {titles.map((title, i) => (
          <GameTitle
            key={i}
            active={title.active}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            <Cursor active={title.active} src="./cursor.png" alt="github" />
            {title.name}
          </GameTitle>
        ))}
      </GameTitles>
    </Container>
  );
};

export default TP;
