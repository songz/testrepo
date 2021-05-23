const rearrangeSticks = function (n, k) {
  const countArrangements = (n, k, map = {}) => {
    if (k === 0 || k > n) return 0n;
    if (n <= 2) return 1n;
    const key = `${n},${k}`;
    if (map[key]) {
      return map[key];
    }

    const result =
      BigInt(n - 1) * countArrangements(n - 1, k, map) +
      countArrangements(n - 1, k - 1, map);

    map[key] = result;

    return BigInt(result);
  };

  return Number(countArrangements(n, k) % 1_000_000_007n);
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
