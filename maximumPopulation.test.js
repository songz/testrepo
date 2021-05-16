/**
 *  * @param {number[][]} logs
 *   * @return {number}
 *    */
var maximumPopulation = function (logs) {
  let max = { year: 1950, population: 0 };
  for (let y = 1950; y <= 2050; y++) {
    const population = logs.reduce((acc, [birth, death]) => {
      if (y >= birth && y < death) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (population > max.population) {
      max.year = y;
      max.population = population;
    }
  }
  return max.year;
};

test("[[1993,1999],[2000,2010]]", () => {
  const r = maximumPopulation([
    [1993, 1999],
    [2000, 2010],
  ]);
  expect(r).toEqual(1993);
});

test("[[1950,1961],[1960,1971],[1970,1981]]", () => {
  const r = maximumPopulation([
    [1950, 1961],
    [1960, 1971],
    [1970, 1981],
  ]);
  expect(r).toEqual(1960);
});
