const big = BigInt(1e9 + 7);

const countArrangements = (n, k, map = {}) => {
  if (k === 0 || k > n) return BigInt(0);
  if (n <= 2) return BigInt(1);
  const key = `${n},${k}`;
  if (map[key]) {
    return map[key];
  }

  const result =
    BigInt(n - 1) * BigInt(countArrangements(n - 1, k, map)) +
    BigInt(countArrangements(n - 1, k - 1, map));

  map[key] = result;

  return BigInt(result);
};

const rearrangeSticks = function (n, k) {
  return Number(countArrangements(n, k) % big);
};

test("3,2", () => {
  const result = rearrangeSticks(3, 2);
  expect(result).toEqual(3);
});

test("5,5", () => {
  const result = rearrangeSticks(5, 5);
  expect(result).toEqual(1);
});

test("20, 11", () => {
  const result = rearrangeSticks(20, 11);
  expect(result).toEqual(647427950);
});
