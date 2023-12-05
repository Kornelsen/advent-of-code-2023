const fs = require("fs");
const readFile = (filePath) => fs.readFileSync(filePath, "utf-8").split("\n");
// const filePath = "input-sample.txt";
const filePath = "input.txt";

const getSeeds = (text) => {
  let seeds = text[0].split(" ");
  seeds.shift();
  seeds = seeds.map((seed) => Number(seed));
  return seeds;
};

const getNewMapping = (seed, mappings) => {
  for (const mapping of mappings) {
    const [dest, src, range] = mapping;
    if (seed >= src && seed < src + range) {
      const diff = seed - src;
      const newMapping = diff + dest;
      return newMapping;
    }
  }
  return seed;
};

const getSeedMappings = (seeds, text) => {
  let mappings = [];
  for (const line of text) {
    if (line.includes(":")) {
      mappings = [];
    } else if (line !== "") {
      const mapping = line.split(" ").map((num) => Number(num));
      mappings.push(mapping);
    } else {
      for (let i = 0; i < seeds.length; i++) {
        const seed = seeds[i];
        seeds[i] = getNewMapping(seed, mappings);
      }
    }
  }
};

const getLowestLocation = () => {
  let text = readFile(filePath);
  const seeds = getSeeds(text);

  text = text.slice(2, text.length);
  text.push("");

  getSeedMappings(seeds, text);

  return Math.min(...seeds);
};

const lowest = getLowestLocation();
console.log(lowest);
