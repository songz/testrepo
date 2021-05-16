/**
 * @param {string} sentence
 * @return {boolean}
 */
var maxIceCream = function (costs, coins) {
  const sortedCosts = costs.sort((a, b) => a - b);
  console.log(sortedCosts);
  return sortedCosts.reduce((acc, c) => {
    if (coins < c) {
      return acc;
    }
    coins = coins - c;
    return acc + 1;
  }, 0);
};

test("[1,3,2,4,1], 7", () => {
  const r = maxIceCream([1, 3, 2, 4, 1], 7);
  expect(r).toEqual(4);
});
