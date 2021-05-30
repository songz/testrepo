/* Edge case: 100000/75000
 *   If you have 3 of them, then you have 3.999999...
 *   But the system will round up to 4
 *   Test it yourself: 3* (100000/75000) // Gives you 4 instead of 3
 */
const eps = 1e-9;
var minSkips = function (dist, speed, hoursBefore) {
  // dp[i][j] = time if we make j skips at road i
  const dp = dist.map((road, i) => {
    return dist.map((d2, j) => {
      return 1e10;
    });
  });

  dp.forEach((jumps, i) => {
    if (i === 0) {
      jumps[0] = 0;
      return;
    }

    const time = dist[i - 1] / speed;
    //console.log(`time ${i}, is ${time}`);
    jumps[0] = dp[i - 1][0] + Math.ceil(time - eps);
    //jumps[i] = dp[i - 1][i - 1] + time;
    for (let j = 1; j < i + 1; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j - 1] + time,
        Math.ceil(dp[i - 1][j] + time - eps)
      );
    }
  });

  console.log(dp);
  for (let i = 0; i < dist.length; i++) {
    const lastTime = dist[dist.length - 1] / speed;
    if (dp[dist.length - 1][i] + lastTime <= hoursBefore) {
      return i;
    }
  }
  return -1;
};

test("dist = [1,3,2], speed = 4, hoursBefore = 2", () => {
  const r = minSkips([1, 3, 2], 4, 2);
  expect(r).toEqual(1);
});

test("dist = [7,3,5,5], speed = 2, hoursBefore = 10", () => {
  const r = minSkips([7, 3, 5, 5], 2, 10);
  expect(r).toEqual(2);
});
