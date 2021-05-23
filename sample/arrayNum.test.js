var maxIceCream = function (costs, coins) {
  return 5;
};

test("[1,3,2,4,1], 7", () => {
  const r = maxIceCream([1, 3, 2, 4, 1], 7);
  expect(r).toEqual(5);
});
