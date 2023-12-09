const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
const filePath = "./input.txt";
// const filePath = "./input-sample.txt";

const getNextHistory = (arr) => {
  if (arr.every((val) => val === 0)) return 0;
  const diffs = [];
  for (let i = arr.length - 1; i > 0; i--) {
    diffs.splice(0, 0, arr[i] - arr[i - 1]);
  }
  const nextHistoryDiff = getNextHistory(diffs);
  const firstElement = diffs[0] || 0;
  return firstElement - nextHistoryDiff;
};

const text = readFile(filePath);
let result = 0;

for (const history of text) {
  const values = history.split(" ").map(Number);
  const pastValue = getNextHistory(values);
  result += values[0] - pastValue;
}

console.log(result);
