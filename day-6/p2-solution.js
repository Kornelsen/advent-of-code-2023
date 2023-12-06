const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");

const filePath = "./input.txt";
// const filePath = "./input-sample.txt";

const getInput = (line) => {
  return line.split(":")[1].replaceAll(" ", "");
};

const getDistance = (hold, time) => {
  return (time - hold) * hold;
};

const getWaysToWin = (time, record) => {
  let minHold = 0;
  let maxHold = time;

  while (getDistance(minHold, time) <= record) {
    minHold++;
  }

  while (getDistance(maxHold, time) <= record) {
    maxHold--;
  }

  return maxHold - minHold + 1;
};

const text = readFile(filePath);
const time = getInput(text[0]);
const record = getInput(text[1]);

const waysToWin = getWaysToWin(time, record);

console.log(waysToWin);
