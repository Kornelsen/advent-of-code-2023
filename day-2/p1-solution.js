const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");

const BAG_CONTENTS = {
  red: 12,
  green: 13,
  blue: 14,
};

const getGameResults = (str) => {
  const regex = /(Game\s)(\d*)(:\s)(.*)/gm;
  let m;

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const id = m[2];
    const gameResult = m[4];
    return [id, gameResult];
  }
};

const validateGames = (games) => {
  let idSum = 0;
  for (const game of games) {
    const [id, result] = getGameResults(game);
    const isValid = validate(result);
    if (isValid) idSum += +id;
  }
  return idSum;
};

const validate = (result) => {
  const rounds = result.split("; ");
  for (const round of rounds) {
    const balls = round.split(", ");
    for (const ball of balls) {
      const [quantity, colour] = ball.split(" ");
      if (BAG_CONTENTS[colour] < +quantity) return false;
    }
  }
  return true;
};

// const filePath = "./input-sample.txt";
const filePath = "./input.txt";

let games = readFile(filePath);
const sum = validateGames(games);
console.log(sum);
