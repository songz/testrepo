const sumBase = function (num, k) {
  return num
    .toString(k)
    .split("")
    .reduce((acc, e) => {
      return acc + parseInt(e, 10);
    }, 0);
};

test("34, 6", () => {
  const r = sumBase(34, 6);
  expect(r).toEqual(9);
});
