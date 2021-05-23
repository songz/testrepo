const canReach = function (s, min, max) {
  const landings = new Array(s.length);
  landings[0] = true;

  const visited = { 0: true };
  const queue = [0];

  while (queue.length) {
    const idx = queue.pop();

    for (let i = min; i <= max; i++) {
      const next = i + idx;

      if (next === s.length - 1) {
        return s[next] === "0";
      }

      if (!visited[next] && s[next] === "0") {
        visited[next] = true;
        queue.push(next);
      }
    }
  }

  return false;
};

test("011010, 2, 3", () => {
  const result = canReach("011010", 2, 3);
  expect(result).toEqual(true);
});

test("01101110", () => {
  const result = canReach("01101110", 2, 3);
  expect(result).toEqual(false);
});
