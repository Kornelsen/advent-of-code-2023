const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");

const getGameResults = (str) => {
  const regex = /(Game\s\d*:\s)(.*)/gm;
  let m;

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const gameResult = m[2];
    return gameResult;
  }
};

const validateGames = (games) => {
  let gamesSum = 0;
  for (const game of games) {
    const result = getGameResults(game);
    const minimums = getMininumRequiredColours(result);
    const setPower = minimums.red * minimums.green * minimums.blue;
    gamesSum += setPower;
  }
  return gamesSum;
};

const getMininumRequiredColours = (game) => {
  const minimums = {
    red: -Infinity,
    green: -Infinity,
    blue: -Infinity,
  };

  const rounds = game.split("; ");
  for (const round of rounds) {
    const balls = round.split(", ");
    for (const ball of balls) {
      const [quantity, colour] = ball.split(" ");
      minimums[colour] = Math.max(minimums[colour], quantity);
    }
  }
  return minimums;
};

// const filePath = "./input-sample.txt";
const filePath = "./input.txt";

let games = readFile(filePath);
const sum = validateGames(games);
console.log(sum);
