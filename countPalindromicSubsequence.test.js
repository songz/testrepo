// O(26n)

const getLastIndex = (s, letter) => {
  for (let i = s.length - 1; i >= 0; i--) {
    if (letter === s[i]) return i;
  }
  return -1;
};

const countPalindromicSubsequence = function (s) {
  let result = 0;
  const matched = {};
  for (let i = 0; i < s.length; i++) {
    const key = s[i];
    if (!matched[key]) {
      const last = getLastIndex(s, key);
      const uniqueLetters = {};

      for (let j = i + 1; j < last; j++) {
        const middle = s[j];
        if (!uniqueLetters[middle]) {
          uniqueLetters[middle] = true;
          result += 1;
        }
      }

      matched[key] = true;
    }
  }
  return result;
};

test("aabca", () => {
  const result = countPalindromicSubsequence("aabca");
  expect(result).toEqual(3);
});

test("adc", () => {
  const result = countPalindromicSubsequence("adc");
  expect(result).toEqual(0);
});

test("bbcbaba", () => {
  const result = countPalindromicSubsequence("bbcbaba");
  expect(result).toEqual(4);
});
