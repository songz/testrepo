/**
 * @param {string} s
 */
const minSwaps = function (s) {
  let extraZeroes = 0;
  let extraOnes = 0;
  for (let i = 0; i < s.length; i++) {
    if (i % 2) {
      // even, should match
      if (s[i] !== "1") {
        extraZeroes += 1;
      }
    } else {
      if (s[i] !== "0") {
        extraOnes += 1;
      }
    }
  }

  let previous = extraZeroes;
  if (extraOnes !== extraZeroes) {
    previous = -1;
  }

  extraZeroes = 0;
  extraOnes = 0;
  for (let i = 0; i < s.length; i++) {
    if (i % 2) {
      // even, should match
      if (s[i] !== "0") {
        extraZeroes += 1;
      }
    } else {
      if (s[i] !== "1") {
        extraOnes += 1;
      }
    }
  }

  if (extraOnes !== extraZeroes) {
    return previous;
  }

  if (previous === -1) {
    return extraOnes;
  }
  return Math.min(previous, extraOnes);
};

test("111000", () => {
  const result = minSwaps("111000");
  expect(result).toEqual(1);
});

test("010", () => {
  const result = minSwaps("010");
  expect(result).toEqual(0);
});

test("1110", () => {
  const result = minSwaps("1110");
  expect(result).toEqual(-1);
});

test.only("1", () => {
  const result = minSwaps("1");
  expect(result).toEqual(0);
});
