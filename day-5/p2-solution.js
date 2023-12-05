// Brute Force Solution

const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
// const filePath = "input-sample.txt";
const filePath = "input.txt";

const getNewMapping = (seed, mappings) => {
  for (const mapping of mappings) {
    const [dest, src, range] = mapping;
    if (seed >= dest && seed < dest + range) {
      const diff = seed - dest;
      const newMapping = diff + src;
      return newMapping;
    }
  }
  return seed;
};

const getSeedLocation = (seed, mappings) => {
  for (const mapping of mappings) {
    seed = getNewMapping(seed, mapping);
  }
  return seed;
};

const getSeedRanges = (seedRanges) => {
  let ranges = [];
  for (let i = 0; i < seedRanges.length; i += 2) {
    const [start, range] = seedRanges.slice(i, i + 2);
    ranges.push([+start, +start + +range]);
  }
  return ranges;
};

const isInRange = (seed, ranges) => {
  for (const [leftBound, rightBound] of ranges) {
    if (seed >= leftBound && seed < rightBound) return true;
  }
  return false;
};

const getMappings = (text) => {
  let mapping = [];
  let mappings = [];

  for (const line of text) {
    if (line.includes(":")) {
      mapping = [];
    } else if (line !== "") {
      const m = line.split(" ").map((num) => Number(num));
      mapping.push(m);
    } else {
      mappings.push(mapping);
    }
  }
  return mappings;
};

const getLowestLocation = () => {
  let text = readFile(filePath);

  let seeds = text[0].split(" ");
  seeds.shift();

  const ranges = getSeedRanges(seeds);

  text = text.slice(2, text.length);
  text.push("");

  const mappings = getMappings(text).reverse();

  let index = 0;
  //   let index = 10000000;

  while (true) {
    const seed = getSeedLocation(index, mappings);
    if (isInRange(seed, ranges)) return index;
    index++;
  }
};

const lowest = getLowestLocation();
console.log(lowest);
