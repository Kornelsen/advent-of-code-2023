const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
const filePath = "./input.txt";
// const filePath = "./input-sample.txt";

const getNextHistory = (arr) => {
  if (arr.every((val) => val === 0)) return 0;
  const diffs = [];
  arr.forEach((value, i) => {
    if (i === arr.length - 1) return;
    diffs.push(arr[i + 1] - value);
  });
  const nextHistoryDiff = getNextHistory(diffs);
  const lastElement = diffs.length > 1 ? diffs[diffs.length - 1] : 0;
  return nextHistoryDiff + lastElement;
};

const text = readFile(filePath);
let result = 0;

for (const history of text) {
  const values = history.split(" ").map(Number);
  const futureValue = getNextHistory(values);
  result += futureValue + values[values.length - 1];
}

console.log(result);
