const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");

const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const getSum = (arr) => {
  let sum = 0;
  for (const val of arr) {
    let left = 0;
    let right = val.length - 1;
    let leftDigit = null;
    let rightDigit = null;

    while (val[left] && val[right] && (!leftDigit || !rightDigit)) {
      if (!leftDigit) {
        if (!isNaN(Number(val[left]))) leftDigit = val[left];
        else {
          for (const num of Object.keys(numbers)) {
            if (num.startsWith(val[left])) {
              if (isKey(val.substring(left, val.length), num)) {
                leftDigit = numbers[num];
                break;
              }
            }
          }
        }
      }
      if (!rightDigit) {
        if (!isNaN(Number(val[right]))) rightDigit = val[right];
        else {
          for (let num of Object.keys(numbers)) {
            num = num.split("").reverse().join("");
            if (num.startsWith(val[right])) {
              if (
                isKey(
                  val
                    .substring(0, right + 1)
                    .split("")
                    .reverse()
                    .join(""),
                  num
                )
              ) {
                rightDigit = numbers[num.split("").reverse().join("")];
                break;
              }
            }
          }
        }
      }
      !leftDigit && left++;
      !rightDigit && right--;
    }
    sum += Number(leftDigit + rightDigit);
  }
  console.log(sum);
};

const isKey = (word, key) => {
  for (i = 0; i < key.length; i++) {
    if (word[i] !== key[i]) return false;
  }
  return true;
};

const arr = readFile("./input.txt");
getSum(arr);
