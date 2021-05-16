var optimize = function (arr) {
  console.log("hi");
};

test("[5, 3, 7, 10]", () => {
  const r = optimize([5, 3, 7, 10]);
  expect(r.player1).toEqual(15);
});
