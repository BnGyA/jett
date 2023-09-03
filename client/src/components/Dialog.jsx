import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { dialogAtom } from "./SocketManager";

const HEIGHT = 150;
const Container = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-40%);
  width: 50%;
  max-height: ${HEIGHT}px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  ${(props) => props.active && "opacity: 1;"}
  ${(props) => props.active && "pointer-events: all;"}
`;

const Pictutre = styled.img`
  width: ${HEIGHT}px;
  height: ${HEIGHT}px;
`;

const Name = styled.p`
  color: #000;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  left: 15px;
  position: absolute;
  top: -5px;
  transform: translateY(-100%);
`;

const Text = styled.p`
  color: #fff;
  padding: 10px;
  margin: 0;
`;

const Info = styled.p`
  color: #fff;
  margin: 0;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Dialog = ({ char, text, active }) => {
  const [_dialog, setDialog] = useAtom(dialogAtom);
  const [textStep, setTextStep] = useState(0);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      console.log(text.length);
      setTextStep(textStep + 1);
      if (textStep === text.length - 1) {
        setDialog({ ..._dialog, active: false });
        setTimeout(() => {
          setTextStep(0);
        }, 500);
      }
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [text, handleKeyPress]);

  return (
    <Container active={active}>
      <Name> {char} </Name>
      <Pictutre src={`./models/dialogs/${char}.png`} alt="character" />
      <Text>{text[textStep]}</Text>
      <Info>Press space to continue...</Info>
    </Container>
  );
};

export default Dialog;
