const getGreatestCommonDivisor = (a, b) => {
  return b === 0 ? a : getGreatestCommonDivisor(b, a % b);
};

function getLCM(a, b) {
  return (a * b) / getGreatestCommonDivisor(a, b);
}

function getArrayLCM(numbers) {
  if (numbers.length < 2) {
    return numbers[0] || 0;
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = getLCM(result, numbers[i]);
  }

  return result;
}

module.exports = {
  getArrayLCM,
};
