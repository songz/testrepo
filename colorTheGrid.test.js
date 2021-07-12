const colors = [1, 2, 3];

// n is how many rows left to go
// c is the color array for established row
const dfs = (n, c, map) => {
  // n = 0 should give 1
  if (!n) {
    return 1n;
  }

  // If we have visited this combination before, just continue
  const key = `${n}-${c.join("-")}`;
  if (map[key]) {
    return map[key];
  }

  let ans = 0n;

  const eachColor = (col = []) => {
    if (col.length === c.length) {
      ans += dfs(n - 1, col, map);
      ans %= 1000_000_007n;
      return;
    }

    colors.forEach((option) => {
      // check option against color to the left, and above
      if (option === col[col.length - 1] || option === c[col.length]) {
        return;
      }

      eachColor([...col, option]);
    });
  };

  eachColor();

  map[key] = ans;
  return ans;
};

var colorTheGrid = function (m, n) {
  const initialColors = new Array(m).fill(0);
  return parseInt(dfs(n, initialColors, {}));
};

test("m = 1, n = 1", () => {
  const r = colorTheGrid(1, 1);
  expect(r).toEqual(3);
});

test("m = 1, n = 2", () => {
  const r = colorTheGrid(1, 2);
  expect(r).toEqual(6);
});

test("m = 5, n = 5", () => {
  const r = colorTheGrid(5, 5);
  expect(r).toEqual(580986);
});
