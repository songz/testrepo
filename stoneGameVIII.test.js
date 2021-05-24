/*
 * Hint:
 * Alice is trying make her score as high as possible, Bob as low as possible
 * Bob is trying to make his score as high as possible, Alice as low as possible
 * P - (OP - p) -> P+p - OP
 *   if other player picks the highest score for him, then P+p - OP is minimized
 *     This satisfies the condition: Bob's goal is the minimize the score difference.
 *
 * Therefore, at any given index (i) of results array, we are trying to find
 *   the maximum score difference the player can get when game starts at i
 */
var stoneGameVIII = function (arr) {
  let sum = 0;
  const prefixes = arr.map((e, i) => {
    sum += e;
    return sum;
  });

  const results = arr.map(() => {
    return prefixes[prefixes.length - 1];
  });

  for (let i = arr.length - 3; i >= 0; i--) {
    results[i] = Math.max(prefixes[i + 1] - results[i + 1], results[i + 1]);
  }
  return results[0];
};

test("[-1,2,-3,4,-5]", () => {
  const r = stoneGameVIII([-1, 2, -3, 4, -5]);
  expect(r).toEqual(5);
});

test("[0, 10, 5, -10, -12]", () => {
  const r = stoneGameVIII([0, 10, 5, -10, -12]);
  expect(r).toEqual(12);
});
