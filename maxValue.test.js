const maxValue = function (n, x) {
  const start = n[0] === "-" ? 1 : 0;
  for (let i = start; i < n.length; i++) {
    const num = parseInt(n[i]);
    if (start && x < num) {
      // negative
      return `${n.substr(0, i)}${x}${n.substr(i)}`;
    }
    if (!start && x > num) {
      // positive
      return `${n.substr(0, i)}${x}${n.substr(i)}`;
    }
  }
  return n + x;
};

test("99, 9", () => {
  const result = maxValue("99", 9);
  expect(result).toEqual("999");
});

test("-13, 2", () => {
  const result = maxValue("-13", 2);
  expect(result).toEqual("-123");
});

test("-132, 3", () => {
  const result = maxValue("-132", 3);
  expect(result).toEqual("-1323");
});

test('"469975787943862651173569913153377" 3', () => {
  const result = maxValue("469975787943862651173569913153377", 3);
  expect(result).toEqual("4699757879438632651173569913153377");
});
