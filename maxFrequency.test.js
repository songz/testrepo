const maxFrequency = function (arr, k) {
  const sorted = arr.sort((a, b) => a - b);
  let result = 0;
  let i = 0;
  let j = 0;
  let sum = 0;

  while (j < arr.length) {
    if (sum > k) {
      sum -= sorted[j] - sorted[i];
      i += 1;
    } else {
      result = Math.max(result, j - i + 1); // +1 is because minimum frequency is 1
      j += 1;
      if (j < arr.length) {
        const area = (j - i) * (sorted[j] - sorted[j - 1]);
        sum += area;
      }
    }
  }

  return result;
};

test("[1,2,4], 5", () => {
  const r = maxFrequency([1, 2, 4], 5);
  expect(r).toEqual(3);
});
test("[1,4,8,13], 5", () => {
  const r = maxFrequency([1, 4, 8, 13], 5);
  expect(r).toEqual(2);
});
test("[3,9,6], 2", () => {
  const r = maxFrequency([3, 9, 6], 2);
  expect(r).toEqual(1);
});
