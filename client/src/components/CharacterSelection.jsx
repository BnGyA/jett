import styled from "styled-components";
import { socket } from "./SocketManager";
import { useAtom } from "jotai";
import {
  confirmStatusAtom,
  releasedCameraAtom,
  releasingCameraAtom,
} from "./SocketManager";

const Card = styled.div`
  border: 0.5px solid #96b8de;
  border-radius: 1px;
  width: 70px;
  height: 90px;
  text-align: center;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
`;

const PlayerCard = styled.img`
  height: 100px;
  position: absolute;
  left: 5px;
  bottom: 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-family: "Inter", sans-serif;
  color: #96b8de;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const CardComp = ({ id }) => {
  const onCharacterSelect = (id) => {
    socket.emit("characterSelect", id);
  };

  return (
    <Card>
      <PlayerCard
        src={`./models/Cards/${id}.png`}
        alt="character"
        onClick={() => onCharacterSelect(id)}
      />
    </Card>
  );
};

const CharacterSelection = () => {
  const [_confirmStatusAtom, setConfirmStatusAtom] = useAtom(confirmStatusAtom);
  const [_releasedCamera, setReleasedCamera] = useAtom(releasedCameraAtom);
  const [_releasingCamera, setReleasingCamera] = useAtom(releasingCameraAtom);
  const charNumber = [1, 2, 3, 4, 5, 6];
  const onCharacterConfirm = () => {
    setConfirmStatusAtom(true);
    setReleasedCamera(true);
  };

  return (
    <Container>
      <Title>SELECT A HERO</Title>
      <CardContainer>
        {charNumber.map((i) => (
          <CardComp id={i} />
        ))}
      </CardContainer>
      <button onClick={onCharacterConfirm}>Confirm</button>
    </Container>
  );
};

export default CharacterSelection;
