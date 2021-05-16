const xorSum = (sum, arr) => {
  return (
    sum +
    arr.reduce((acc, num) => {
      return acc ^ num;
    }, 0)
  );
};

var subsetXORSum = function (arr) {
  const subsets = arr
    .reduce(
      (givenSet, setValue) => {
        return givenSet.concat(
          givenSet.map((givenSet) => [setValue, ...givenSet])
        );
      },
      [[]]
    )
    .filter((r) => r.length);

  return subsets.reduce(xorSum, 0);
};

test("[1,3]", () => {
  const r = subsetXORSum([1, 3]);
  expect(r).toEqual(6);
});

test("[5,1,6]", () => {
  const r = subsetXORSum([5, 1, 6]);
  expect(r).toEqual(28);
});

test("[3,4,5,6,7,8]", () => {
  const r = subsetXORSum([3, 4, 5, 6, 7, 8]);
  expect(r).toEqual(480);
});
