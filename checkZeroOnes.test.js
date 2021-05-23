const checkZeroOnes = function (s) {
  let cur = s[0];
  const counts = {
    0: 0,
    1: 0,
  };
  counts[cur] = 1;

  let count = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== cur) {
      if (count > counts[cur]) {
        counts[cur] = count;
      }
      count = 1;
      cur = s[i];
    } else {
      count += 1;
    }
  }

  if (count > counts[cur]) {
    counts[cur] = count;
  }
  return counts[1] > counts[0];
};

test("1101", () => {
  const result = checkZeroOnes("1101");
  expect(result).toEqual(true);
});

test("111000", () => {
  const result = checkZeroOnes("111000");
  expect(result).toEqual(false);
});

test("110100010", () => {
  const result = checkZeroOnes("110100010");
  expect(result).toEqual(false);
});
