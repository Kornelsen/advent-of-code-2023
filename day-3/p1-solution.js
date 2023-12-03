const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");

const symbols = new Set(["@", "#", "$", "%", "&", "*", "+", "-", "/", "="]);
const visited = new Set();

// const filePath = "./input-sample.txt";
const filePath = "./input.txt";

const fileContents = readFile(filePath);
const schematic = fileContents.map((line) => line.split(""));

const checkPointNeighbours = (row, col) => {
  let neighboursSum = 0;
  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = col - 1; y <= col + 1; y++) {
      if (
        x >= 0 &&
        x < schematic.length &&
        y >= 0 &&
        y < schematic[0].length &&
        !(x === row && y === col)
      ) {
        const partNumber = getPartNumber(x, y);
        neighboursSum += partNumber;
      }
    }
  }
  return neighboursSum;
};

const isValidNumber = (x, y) => {
  return (
    schematic[x][y] &&
    !isNaN(Number(schematic[x][y])) &&
    !visited.has([x, y].toString())
  );
};

const getPartNumber = (x, y) => {
  if (!isValidNumber(x, y)) return 0;
  let numString = "";

  let left = y;
  let right = y + 1;

  while (isValidNumber(x, left)) {
    const digit = schematic[x][left];
    visited.add([x, left].toString());
    numString = digit + numString;
    left--;
  }

  while (isValidNumber(x, right)) {
    const digit = schematic[x][right];
    visited.add([x, right].toString());
    numString += digit;
    right++;
  }
  return +numString;
};

let sum = 0;

for (let row = 0; row < schematic.length; row++) {
  for (let col = 0; col < schematic[row].length; col++) {
    const char = schematic[row][col];
    if (symbols.has(char)) {
      sum += checkPointNeighbours(row, col);
    }
  }
}

console.log(sum);
