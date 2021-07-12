// https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/discuss/574912/JavaC%2B%2B-DFS-Memoization-with-Picture-Clean-code

const colors = [1, 2, 3];

// a0, b0, c0 stands for previous row.
const dfs = (n, a0, b0, c0, dp) => {
  if (!n) {
    return 1n;
  }

  if (dp[n][a0][b0][c0]) {
    return dp[n][a0][b0][c0];
  }

  let ans = 0n;

  colors.forEach((c1) => {
    if (c1 !== a0) {
      colors.forEach((c2) => {
        if (c2 !== b0 && c2 !== c1) {
          colors.forEach((c3) => {
            if (c3 !== c0 && c3 !== c2) {
              ans += dfs(n - 1, c1, c2, c3, dp);
              ans %= 1000_000_007n;
            }
          });
        }
      });
    }
  });

  dp[n][a0][b0][c0] = ans;
  return ans;
};

var numOfWays = function (n) {
  const dp = [...Array(n + 1)].map((a) => {
    return [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ];
  });

  return parseInt(dfs(n, 0, 0, 0, dp));
};

test("1", () => {
  const r = numOfWays(1);
  expect(r).toEqual(12);
});

test("2", () => {
  const r = numOfWays(2);
  expect(r).toEqual(54);
});

test("3", () => {
  const r = numOfWays(3);
  expect(r).toEqual(246);
});

test("7", () => {
  const r = numOfWays(7);
  expect(r).toEqual(106494);
});
