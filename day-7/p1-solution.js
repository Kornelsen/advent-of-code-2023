const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
const filePath = "./input.txt";
// const filePath = "./input-sample.txt";

const cardValues = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

const handTypes = {
  HIGHEST: 1,
  PAIR: 2,
  TWO_PAIR: 3,
  THREE_OF_A_KIND: 4,
  FULL_HOUSE: 5,
  FOUR_OF_A_KIND: 6,
  FIVE_OF_A_KIND: 7,
};

const getHandValue = (cards) => {
  const map = new Map();
  let value = 0;
  let highest = 0;
  for (const card of cards) {
    map.set(card, (map.get(card) ?? 0) + 1);
    highest = Math.max(highest, cardValues[card]);
  }

  const cardOccurences = [...map.values()];

  switch (map.size) {
    case 5:
      value = handTypes.HIGHEST;
      break;
    case 4:
      value = handTypes.PAIR;
      break;
    case 3:
      if (
        cardOccurences[0] === 2 ||
        cardOccurences[1] === 2 ||
        cardOccurences[2] === 2
      ) {
        value = handTypes.TWO_PAIR;
      } else {
        value = handTypes.THREE_OF_A_KIND;
      }
      break;
    case 2:
      if (cardOccurences[0] === 2 || cardOccurences[0] === 3) {
        value = handTypes.FULL_HOUSE;
      } else {
        value = handTypes.FOUR_OF_A_KIND;
      }
      break;
    case 1:
      value = handTypes.FIVE_OF_A_KIND;
      break;
  }

  return value;
};

const text = readFile(filePath);

const hands = text.map((line) => {
  const [cardsStr, bid] = line.split(" ");
  const cards = cardsStr.split("");
  return {
    cards,
    bid,
    value: getHandValue(cards),
  };
});

hands.sort(
  ({ cards: cardsA, value: valueA }, { cards: cardsB, value: valueB }) => {
    if (valueA === valueB) {
      for (let i = 0; i < cardsA.length; i++) {
        const cardA = cardsA[i];
        const cardB = cardsB[i];
        if (cardValues[cardA] !== cardValues[cardB]) {
          return cardValues[cardA] - cardValues[cardB];
        }
      }
    }
    return valueA - valueB;
  }
);

const result = hands.reduce((accumulator, { bid }, index) => {
  console.log(bid, index + 1, bid * (index + 1));
  return accumulator + bid * (index + 1);
}, 0);

console.log(result);
