import { Html } from "@react-three/drei";
import styled from "styled-components";

const Card = styled.div`
  border: 0.5px solid #96b8de;
  border-radius: 1px;
  width: 70px;
  height: 90px;
  text-align: center;
  position: relative;
  margin-bottom: 10px;
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

const CharacterSelection = () => {
  return (
    <Html
      castShadow
      receiveShadow
      transform
      position={[-0.6, 0.9, 15]}
      scale="0.2"
    >
      <Title>SELECT A HERO</Title>
      <CardContainer>
        <Card>
          <PlayerCard src="./models/Cards/1.png" alt="character" />
        </Card>
        <Card>
          <PlayerCard src="./models/Cards/2.png" alt="character" />
        </Card>
        <Card>
          <PlayerCard src="./models/Cards/3.png" alt="character" />
        </Card>
        <Card>
          <PlayerCard src="./models/Cards/4.png" alt="character" />
        </Card>
        <Card>
          <PlayerCard src="./models/Cards/5.png" alt="character" />
        </Card>
        <Card>
          <PlayerCard src="./models/Cards/6.png" alt="character" />
        </Card>
      </CardContainer>
    </Html>
  );
};

export default CharacterSelection;
