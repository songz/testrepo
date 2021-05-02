// over the time limit solution
/*
var maxBuilding = function (n, restrictions) {
  const map = { 0: 1 };
  restrictions.forEach(([num, height]) => {
    map[num - 1] = height;
  });

  // Fill in all the theoretical max
  for (let i = 0; i < n; i++) {
    if (isNaN(map[i])) {
      map[i] = i;
    } else {
      map[i] = Math.min(i, map[i]);
    }
  }

  // compare each with its neighbors
  for (let i = 1; i < n - 1; i++) {
    map[i] = Math.min(map[i - 1] + 1, map[i], map[i + 1] + 1);
  }

  // compare each with its neighbors
  for (let i = n - 2; i > 0; i--) {
    map[i] = Math.min(map[i - 1] + 1, map[i], map[i + 1] + 1);
  }

  //console.log(JSON.stringify(map, null, 2));
  map[n - 1] = Math.min(map[n - 2] + 1, map[n - 1]);

  return Math.max(...Object.values(map));
};
*/

const maxBuilding = (n, restrictions) => {
  const newRestrictions = restrictions.map(([idx, max], i, arr) => {
    // Sometimes given height can be more than what it should be, so we need to set the record straight
    const height = Math.min(idx, max);
    return {
      idx: idx - 1,
      height,
    };
  });

  const sortedRestrictions = [{ idx: 0, height: 0 }, ...newRestrictions].sort(
    (a, b) => a.idx - b.idx
  );

  if (sortedRestrictions[sortedRestrictions.length - 1].idx !== n - 1) {
    sortedRestrictions.push({
      idx: n - 1,
      height: n - 1,
    });
  }

  sortedRestrictions.forEach(({ idx, height }, i) => {
    const prev = sortedRestrictions[i - 1];
    if (!prev) return;

    const diff = idx - prev.idx;
    sortedRestrictions[i].height = Math.min(prev.height + diff, height);
  });

  for (let i = sortedRestrictions.length - 1; i > 0; i--) {
    const prev = sortedRestrictions[i - 1];
    const current = sortedRestrictions[i];

    const diff = current.idx - prev.idx;
    prev.height = Math.min(prev.height, current.height + diff);
  }

  //console.log(sortedRestrictions);
  let max = 0;
  return sortedRestrictions.reduce((acc, { idx, height }, i) => {
    if (!i) return acc; // skip the first one
    const prev = sortedRestrictions[i - 1];
    let middleHeight = 0;
    if (height > prev.height) {
      const rightIdx = idx + (height - prev.height);
      middleHeight = Math.floor(prev.height + (rightIdx - prev.idx) / 2);
    }
    if (height < prev.height) {
      const leftIdx = prev.idx - (prev.height - height);
      middleHeight = Math.floor(height + (idx - leftIdx) / 2);
    }
    if (height === prev.height) {
      middleHeight = prev.height + Math.floor((idx - prev.idx) / 2);
    }
    return Math.max(acc, prev.height, middleHeight, height);
  }, 0);
};

test("5, [[2,1],[4,1]]", () => {
  const r = maxBuilding(5, [
    [2, 1],
    [4, 1],
  ]);
  expect(r).toEqual(2);
});

test("6, []", () => {
  const r = maxBuilding(6, []);
  expect(r).toEqual(5);
});

test("10, [[5,3], [2,5], [7,4],[10,3]]", () => {
  const r = maxBuilding(10, [
    [5, 3],
    [2, 5],
    [7, 4],
    [10, 3],
  ]);
  expect(r).toEqual(5);
});

test("10, [[8,5],[9,0],[6,2],[4,0],[3,2],[10,0],[5,3],[7,3],[2,4]]", () => {
  const r = maxBuilding(10, [
    [8, 5],
    [9, 0],
    [6, 2],
    [4, 0],
    [3, 2],
    [10, 0],
    [5, 3],
    [7, 3],
    [2, 4],
  ]);
  expect(r).toEqual(2);
});

test("10 [[6,0],[5,2],[7,0],[9,1],[2,4],[3,4],[4,0],[8,2],[10,0]]", () => {
  const r = maxBuilding(10, [
    [6, 0],
    [5, 2],
    [7, 0],
    [9, 1],
    [2, 4],
    [3, 4],
    [4, 0],
    [8, 2],
    [10, 0],
  ]);
  expect(r).toEqual(1);
});

test("9 [[3,1],[9,2]]", () => {
  const r = maxBuilding(9, [
    [3, 1],
    [9, 2],
  ]);
  expect(r).toEqual(4);
});

test("10 [[3,1],[10,2]]", () => {
  const r = maxBuilding(10, [
    [3, 1],
    [10, 2],
  ]);
  expect(r).toEqual(5);
});
