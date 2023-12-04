const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");

const filePath = "./input.txt";
// const filePath = "./input-sample.txt";
const scratchCards = readFile(filePath);
let totalPoints = 0;

for (card of scratchCards) {
  let [cardLeft, cardRight] = card.split(" | ");
  cardLeft = cardLeft.split(":")[1].split(" ");
  cardRight = cardRight.split(" ");

  const winningNums = new Set();
  let points = 0;

  for (num of cardLeft) {
    if (num === "" || isNaN(Number(num))) continue;
    winningNums.add(num);
  }

  for (num of cardRight) {
    if (winningNums.has(num)) {
      if (!points) points = 1;
      else points = points * 2;
    }
  }

  totalPoints += points;
}

console.log(totalPoints);
