/**
 *  * @param {number[][]} logs
 *   * @return {number}
 *    */
var maximumPopulation = function (logs) {
  let max = { year: 1950, population: 0 };
  return max.year;
};

test("[[1993,1999],[2000,2010]]", () => {
  const r = maximumPopulation([
    [1993, 1999],
    [2000, 2010],
  ]);
  expect(r).toEqual(1993);
});
