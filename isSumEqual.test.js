const map = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

const getLetterValue = (str) => {
  let sum = "";
  for (let i = 0; i < str.length; i++) {
    sum += map[str[i]];
  }
  return parseInt(sum);
};
const isSumEqual = function (a, b, c) {
  return getLetterValue(a) + getLetterValue(b) === getLetterValue(c);
};

test("acb, cba, cdb", () => {
  const result = isSumEqual("acb", "cba", "cdb");
  expect(result).toEqual(true);
});

test('firstWord = "aaa", secondWord = "a", targetWord = "aab"', () => {
  const result = isSumEqual("aaa", "a", "aab");
  expect(result).toEqual(false);
});

test(' firstWord = "aaa", secondWord = "a", targetWord = "aaaa"', () => {
  const result = isSumEqual("aaa", "a", "aaaa");
  expect(result).toEqual(true);
});
