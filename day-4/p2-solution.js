const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
const filePath = "./input.txt";
// const filePath = "./input-sample.txt";

const buildCards = (cards) => {
  return cards.map((card) => {
    const [cardLeft, cardRight, cardId] = getCardDetails(card);
    const winners = getWinnerSet(cardLeft);

    let matches = 0;

    for (num of cardRight) {
      if (winners.has(num)) {
        matches++;
      }
    }

    return {
      id: +cardId,
      winners,
      nums: cardRight,
      matches,
    };
  });
};

const getCardDetails = (card) => {
  let [cardLeftString, cardRightString] = card.split(" | ");
  const cardLeftDetails = getCardLeftDetails(cardLeftString);
  const cardId = cardLeftDetails[0];
  const cardLeft = cardLeftDetails[1].split(" ");
  const cardRight = cardRightString.split(" ");
  return [cardLeft, cardRight, cardId];
};

const getCardLeftDetails = (str) => {
  const regex = /(Card\s*)(\d*)(:\s)(.*)/gm;
  let m;

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const id = m[2];
    const numbers = m[4];
    return [id, numbers];
  }
};

const getWinnerSet = (cardLeft) => {
  const winners = new Set();
  for (num of cardLeft) {
    if (num === "" || isNaN(Number(num))) continue;
    winners.add(num);
  }
  return winners;
};

const getCardCounts = (scratchCards) => {
  const memo = {};

  for (let i = scratchCards.length - 1; i >= 0; i--) {
    let bonuses = 1;
    const card = scratchCards[i];
    for (let j = card.matches; j > 0; j--) {
      bonuses += memo[card.id + j];
    }
    memo[card.id] = bonuses;
  }
  return memo;
};

const getTotalCards = (filePath) => {
  const fileData = readFile(filePath);
  const scratchCards = buildCards(fileData);
  const cardCounts = getCardCounts(scratchCards);

  let result = 0;

  for (value of Object.values(cardCounts)) {
    result += value;
  }

  return result;
};

const result = getTotalCards(filePath);
console.log(result);
