var getContenation = function (nums) {
  return [...nums, ...nums];
};

test("[1,2,1]", () => {
  const r = getContenation([1, 2, 1]);
  expect(r).toEqual([1, 2, 1, 1, 2, 1]);
});

test("[1,3,2,1]", () => {
  const r = getContenation([1, 3, 2, 1]);
  expect(r).toEqual([1, 3, 2, 1, 1, 3, 2, 1]);
});
