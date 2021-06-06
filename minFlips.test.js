// Detailed Explanation:
// https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/discuss/1254536/JS-solution-with-Explanation
const minFlips = function (s) {
  const arr = s.split("");
  const start1Flips = [];
  const start0Flips = [];

  arr.forEach((letter, i) => {
    const is1 = letter === "1";
    if (i % 2 === 0) {
      // even index. start1 should be 1, start0 should be 0
      start1Flips[i] = (start1Flips[i - 1] || 0) + (is1 ? 0 : 1);
      start0Flips[i] = (start0Flips[i - 1] || 0) + (is1 ? 1 : 0);
    } else {
      // odd index. start1 should be 0, start0 should be 1
      start1Flips[i] = (start1Flips[i - 1] || 0) + (is1 ? 1 : 0);
      start0Flips[i] = (start0Flips[i - 1] || 0) + (is1 ? 0 : 1);
    }
  });

  const lastIdx = s.length - 1;
  const smallestFlips = Math.min(start1Flips[lastIdx], start0Flips[lastIdx]);

  // If s length is even, then we don't need to do any rotations
  if (s.length % 2 === 0) {
    return smallestFlips;
  }

  return arr.reduce((acc, e, i) => {
    const rotate1 = start1Flips[lastIdx] - start1Flips[i] + start0Flips[i];
    const rotate0 = start0Flips[lastIdx] - start0Flips[i] + start1Flips[i];
    return Math.min(acc, rotate1, rotate0);
  }, smallestFlips);
};

test("111000", () => {
  const result = minFlips("111000");
  expect(result).toEqual(2);
});

test("011000", () => {
  const result = minFlips("011000");
  expect(result).toEqual(3);
});

test("01100", () => {
  const result = minFlips("01100");
  expect(result).toEqual(1);
});
