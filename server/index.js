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
          totalContributions
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
const hiddeNotModel = true;

const items = {
  pillar: {
    name: "pillar",
    size: [2, 2],
  },
  pillar2: {
    name: "pillar",
    size: [2, 2],
  },
  pillar3: {
    name: "pillar",
    size: [2, 2],
  },
  pillar4: {
    name: "pillar",
    size: [2, 2],
  },
  pillar5: {
    name: "pillar",
    size: [2, 2],
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
  air_stair_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_3: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_4: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_5: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_6: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_7: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_8: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_9: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_10: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_11: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_stair_12: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 2],
    notAModel: hiddeNotModel,
  },
  air_intro_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 22],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_intro_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_intro_3: {
    name: hiddeNotModel ? "air" : "cube",
    size: [24, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_intro_4: {
    name: hiddeNotModel ? "air" : "cube",
    size: [28, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_trophy_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 22],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_trophy_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [22, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_github_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_github_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [28, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_github_3: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_charBuild_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_charBuild_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [28, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_charBuild_3: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_project_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_project_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [28, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_project_3: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_instagram_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_instagram_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [28, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_instagram_3: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 24],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_timeline_1: {
    name: hiddeNotModel ? "air" : "cube",
    size: [2, 42],
    cube: true,
    notAModel: hiddeNotModel,
  },
  air_timeline_2: {
    name: hiddeNotModel ? "air" : "cube",
    size: [8, 2],
    cube: true,
    notAModel: hiddeNotModel,
  },
};

const map = {
  size: [110, 35],
  gridDivision: 2,
  items: [
    {
      ...items.pillar,
      gridPosition: [4, 4],
    },
    {
      ...items.pillar2,
      gridPosition: [4, 9],
    },
    {
      ...items.pillar3,
      gridPosition: [9, 4],
    },
    {
      ...items.pillar4,
      gridPosition: [4, 13],
    },
    {
      ...items.pillar5,
      gridPosition: [13, 4],
    },

    {
      ...items.rugRectangle,
      gridPosition: [8, 7],
      rotation: 1,
    },
    {
      ...items.githubFloor,
      gridPosition: [8, 18],
    },
    {
      ...items.air_stair_1,
      gridPosition: [26, 22],
    },
    {
      ...items.air_stair_2,
      gridPosition: [28, 24],
    },
    {
      ...items.air_stair_3,
      gridPosition: [30, 26],
    },
    {
      ...items.air_stair_4,
      gridPosition: [32, 28],
    },
    {
      ...items.air_stair_5,
      gridPosition: [34, 30],
    },
    {
      ...items.air_stair_6,
      gridPosition: [36, 32],
    },
    {
      ...items.air_stair_7,
      gridPosition: [22, 26],
    },
    {
      ...items.air_stair_8,
      gridPosition: [24, 28],
    },
    {
      ...items.air_stair_9,
      gridPosition: [26, 30],
    },
    {
      ...items.air_stair_10,
      gridPosition: [28, 32],
    },
    {
      ...items.air_stair_11,
      gridPosition: [30, 34],
    },
    {
      ...items.air_stair_12,
      gridPosition: [32, 36],
    },
    {
      ...items.air_intro_1,
      gridPosition: [34, 38],
    },
    {
      ...items.air_intro_2,
      gridPosition: [60, 36],
    },
    {
      ...items.air_intro_3,
      gridPosition: [38, 34],
    },
    {
      ...items.air_intro_4,
      gridPosition: [34, 60],
    },
    {
      ...items.air_trophy_1,
      gridPosition: [24, 0],
    },
    {
      ...items.air_trophy_2,
      gridPosition: [0, 24],
    },
    {
      ...items.air_github_1,
      gridPosition: [70, 0],
    },
    {
      ...items.air_github_2,
      gridPosition: [70, 24],
    },
    {
      ...items.air_github_3,
      gridPosition: [96, 0],
    },
    {
      ...items.air_charBuild_1,
      gridPosition: [100, 46],
    },
    {
      ...items.air_charBuild_2,
      gridPosition: [100, 44],
    },
    {
      ...items.air_charBuild_3,
      gridPosition: [126, 46],
    },
    {
      ...items.air_project_1,
      gridPosition: [126, 0],
    },
    {
      ...items.air_project_2,
      gridPosition: [126, 24],
    },
    {
      ...items.air_project_3,
      gridPosition: [152, 0],
    },
    {
      ...items.air_instagram_1,
      gridPosition: [158, 46],
    },
    {
      ...items.air_instagram_2,
      gridPosition: [158, 44],
    },
    {
      ...items.air_instagram_3,
      gridPosition: [184, 46],
    },
    {
      ...items.air_timeline_1,
      gridPosition: [210, 0],
    },
    {
      ...items.air_timeline_2,
      gridPosition: [212, 40],
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

  socket.on("teleport", (coords) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );

    console.log("coords", coords);
    if (!coords) return;

    character.position = [
      coords[0] * map.gridDivision - 1,
      coords[1] * map.gridDivision - 1,
    ];
    character.path = [];
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
      position: [30 * map.gridDivision - 1, 30 * map.gridDivision - 1],
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
