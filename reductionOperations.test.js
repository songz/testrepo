var reductionOperations = function (arr) {
  const sorted = arr.sort((a, b) => a - b);
  let biggest = sorted[0];
  let addition = 0;
  return sorted.reduce((acc, val, i) => {
    if (i === 0) {
      return 0;
    }
    if (val > biggest) {
      biggest = val;
      addition += 1;
    }
    return acc + addition;
  }, 0);
};

test("[5, 3, 7, 10]", () => {
  const r = reductionOperations([5, 1, 3]);
  expect(r).toEqual(3);
});

test("[1,1,1]", () => {
  const r = reductionOperations([1, 1, 1]);
  expect(r).toEqual(0);
});

test("[1,1,2,2,3]", () => {
  const r = reductionOperations([1, 1, 2, 2, 3]);
  expect(r).toEqual(4);
});
