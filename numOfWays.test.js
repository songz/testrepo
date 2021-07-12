const colors = [1, 2, 3];

// n is how many rows left to go
// c is the color array for established row
const dfs = (n, c, map) => {
  // n = 0 should give 1
  if (!n) {
    return 1n;
  }

  // If we have visited this combination before, just continue
  const key = `${n}-${c[0]}-${c[1]}-${c[2]}`;
  if (map[key]) {
    return map[key];
  }

  let ans = 0n;

  colors.forEach((c1) => {
    if (c1 !== c[0]) {
      colors.forEach((c2) => {
        if (c2 !== c[1] && c2 !== c1) {
          colors.forEach((c3) => {
            if (c3 !== c[2] && c3 !== c2) {
              ans += dfs(n - 1, [c1, c2, c3], map);
              ans %= 1000_000_007n;
            }
          });
        }
      });
    }
  });

  map[key] = ans;
  return ans;
};

var numOfWays = function (n) {
  // start with n rows with nonexisting colors on row 0
  return parseInt(dfs(n, [0, 0, 0], {}));
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
