import Pathfinding from "pathfinding";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";
import express from "express";
import cors from "cors";
import models from "./models.js";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

httpServer.listen(process.env.PORT || 3001);

const githubContrib = [];

const query = `
  query ContributionGraph {
    user(login: "BnGyA") {
      contributionsCollection(
        from: "2023-01-01T00:00:00+00:00"
        to: "2023-12-31T00:00:00+00:00"
      ) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionLevel
              weekday
              date
            }
          }
        }
      }
    }
  }
`;

fetch("https://api.github.com/graphql", {
  method: "POST",
  body: JSON.stringify({ query }),
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
})
  .then((res) => res.text())
  .then((body) => githubContrib.push(JSON.parse(body)))
  .catch((error) => console.error(error));

const characters = [];

const items = {
  tableCoffee: {
    name: "tableCoffee",
    size: [4, 2],
  },
  rugRectangle: {
    name: "rugRectangle",
    size: [8, 4],
    walkable: true,
  },

  githubFloor: {
    name: "githubFloor",
    size: [2, 2],
    notAModel: true,
  },
};

const map = {
  size: [20, 20],
  gridDivision: 2,
  items: [
    {
      ...items.tableCoffee,
      gridPosition: [10, 8],
      //   rotation: 1,
    },
    {
      ...items.rugRectangle,
      gridPosition: [8, 7],
    },
    {
      ...items.githubFloor,
      gridPosition: [8, 18],
    },
  ],
};

// PATHFINDING

const grid = new Pathfinding.Grid(
  map.size[0] * map.gridDivision,
  map.size[1] * map.gridDivision
);

const finder = new Pathfinding.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true,
});

const updateGrid = () => {
  map.items.forEach((item) => {
    if (item.walkable || item.wall) {
      return;
    }
    const width =
      item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
    const height =
      item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        grid.setWalkableAt(
          item.gridPosition[0] + x,
          item.gridPosition[1] + y,
          false
        );
      }
    }
  });
};

updateGrid();

const findPath = (start, end) => {
  const gridClone = grid.clone();
  const path = finder.findPath(start[0], start[1], end[0], end[1], gridClone);
  return path;
};

const generateRandomPosition = () => {
  for (let i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * map.size[0] * map.gridDivision);
    const y = Math.floor(Math.random() * map.size[1] * map.gridDivision);
    if (grid.isWalkableAt(x, y)) {
      return [x, y];
    }
  }
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const generateRandomModel = () => {
  return models[Math.floor(Math.random() * models.length)];
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.emit("hello", {
    map,
    characters,
    id: socket.id,
    items,
    githubContrib,
  });

  io.emit("characters", characters);

  socket.on("move", (from, to) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    const path = findPath(from, to);
    if (!path) {
      return;
    }

    character.position = from;
    character.path = path;
    io.emit("playerMove", character);
  });

  socket.on("characterSelect", (model) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      characters.splice(
        characters.findIndex((character) => character.id === socket.id),
        1
      );
    }
    io.emit("characters", characters);
    characters.push({
      id: socket.id,
      // position: generateRandomPosition(),
      position: [
        map.size[0] * map.gridDivision - 1,
        map.size[1] * map.gridDivision - 1,
      ],
      hairColor: generateRandomHexColor(),
      topColor: generateRandomHexColor(),
      bottomColor: generateRandomHexColor(),
      model: { id: model },
    });
    io.emit("characters", characters);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    );
    io.emit("characters", characters);
  });
});
