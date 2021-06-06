const isEqual = (arr1, arr2) => {
  const result = arr1.find((row, rdx) => {
    const foundElement = row.find((val, cdx) => {
      return val !== arr2[rdx][cdx];
    });
    return foundElement !== undefined;
  });

  return result === undefined; // no Difference
};

const rotate = (arr) => {
  return arr.map((row, rdx) => {
    return row.map((_c, cdx) => {
      return arr[arr.length - 1 - cdx][rdx];
    });
  });
};

var findRotation = function (mat, target) {
  if (isEqual(mat, target)) {
    return true;
  }

  // rotate once
  let rotated = rotate(mat);
  if (isEqual(rotated, target)) {
    return true;
  }

  // rotate twice
  rotated = rotate(rotated);
  if (isEqual(rotated, target)) {
    return true;
  }

  // rotate thrice
  rotated = rotate(rotated);
  if (isEqual(rotated, target)) {
    return true;
  }
  return false;
};

test("[[0,0,0],[0,0,1],[0,0,1]] [[0,0,0],[0,0,1],[0,0,1]]", () => {
  const r = isEqual(
    [
      [0, 0, 0],
      [0, 0, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 0, 1],
      [0, 0, 1],
    ]
  );
  expect(r).toEqual(true);
});

test("[[0,0],[1,1]] [[0,1],[1,0]]", () => {
  const r = isEqual(
    [
      [1, 1],
      [0, 0],
    ],
    [
      [0, 1],
      [1, 0],
    ]
  );
  expect(r).toEqual(false);
});

test("[[0,0],[1,1]] [[0,1],[1,0]]", () => {
  const r = findRotation(
    [
      [0, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 0],
    ]
  );
  expect(r).toEqual(false);
});

test("mat = [[0,1],[1,0]], target = [[1,0],[0,1]]", () => {
  const r = findRotation(
    [
      [0, 1],
      [1, 0],
    ],
    [
      [1, 0],
      [0, 1],
    ]
  );
  expect(r).toEqual(true);
});

test("mat = [[0,1],[1,1]], target = [[1,0],[0,1]]", () => {
  const r = findRotation(
    [
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [0, 1],
    ]
  );
  expect(r).toEqual(false);
});

test("mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]", () => {
  const r = findRotation(
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]
  );
  expect(r).toEqual(true);
});
