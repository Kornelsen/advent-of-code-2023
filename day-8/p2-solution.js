const { getArrayLCM } = require("./lcmHelper");
const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
const filePath = "./input.txt";
// const filePath = "./input-sample.txt";

const getMap = (text) => {
  const nodes = {};

  for (const line of text) {
    let [key, value] = line.split(" = ");
    value = value.substring(1, value.length - 1);
    value = value.split(", ");
    nodes[key] = value;
  }

  return nodes;
};

const getNextDirection = (i, directions) => {
  return i + 1 === directions.length ? 0 : i + 1;
};

const search = (node, depth, dirIndex, directions) => {
  while (node[2] !== "Z") {
    const [left, right] = nodes[node];
    const direction = directions[dirIndex];
    node = direction === "L" ? left : right;
    dirIndex = getNextDirection(dirIndex, directions);
    depth++;
  }
  return depth;
};

let text = readFile(filePath);
const directions = text[0].split("");
text = text.slice(2, text.length);

const nodes = getMap(text);
const startNodes = Object.keys(nodes).filter((node) => node[2] === "A");
const depths = startNodes.map((node) => search(node, 0, 0, directions));

const lcm = getArrayLCM(depths);

console.log(lcm);
