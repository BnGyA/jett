import { useEffect } from "react";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

console.log(import.meta.env.VITE_IO_SERVER);

export const socket = io(import.meta.env.VITE_IO_SERVER);
export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);

export const SocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_map, setMap] = useAtom(mapAtom);
  const [_user, setUser] = useAtom(userAtom);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }
    function onDisconnect() {
      console.log("Disconnected");
    }
    function onHello(value) {
      console.log("Hello");
      setMap(value.map);
      setCharacters(value);
      setUser(value.id);
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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);
    socket.on("playerMove", onPlayerMove);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters);
      socket.off("playerMove", onPlayerMove);
    };
  }, []);
};
