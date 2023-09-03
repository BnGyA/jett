import { useEffect } from "react";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

console.log(import.meta.env.VITE_IO_SERVER);

export const socket = io(import.meta.env.VITE_IO_SERVER);
export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);
export const githubContribAtom = atom(null);
export const confirmStatusAtom = atom(false);
export const releasedCameraAtom = atom(false);
export const releasingCameraAtom = atom(false);
export const dialogAtom = atom({
  active: false,
  char: "",
  text: "",
});

export const SocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_map, setMap] = useAtom(mapAtom);
  const [_user, setUser] = useAtom(userAtom);
  const [_githubContrib, setGithubContrib] = useAtom(githubContribAtom);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }
    function onDisconnect() {
      console.log("Disconnected");
    }
    function onHello(value) {
      setMap(value.map);
      setCharacters(value);
      setUser(value.id);
      setGithubContrib(value.githubContrib);
    }

    function onCharacters(value) {
      console.log(value);
      setCharacters(value);
    }

    function onPlayerMove(value) {
      setCharacters((prev) => {
        return prev.map((character) => {
          if (character.id === value.id) {
            return value;
          }
          return character;
        });
      });
    }

    function onCharacterSelect() {
      console.log("character selected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);
    socket.on("playerMove", onPlayerMove);
    socket.on("characterSelect", onCharacterSelect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters);
      socket.off("playerMove", onPlayerMove);
      socket.off("characterSelect", onCharacterSelect);
    };
  }, []);
};
