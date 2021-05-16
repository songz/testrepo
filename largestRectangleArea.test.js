var largestRectangleArea = function (heights) {
  const leftBound = new Array(heights.length);
  const rightBound = new Array(heights.length);
  leftBound[0] = -1;
  rightBound[heights.length - 1] = heights.length;

  for (let i = 1; i < heights.length; i++) {
    let l = i - 1;
    while (l >= 0 && heights[l] >= heights[i]) {
      l = leftBound[l];
    }
    leftBound[i] = l;
  }

  for (let i = heights.length - 2; i > -1; i--) {
    let r = i + 1;
    while (r < heights.length && heights[r] >= heights[i]) {
      r = rightBound[r];
    }
    rightBound[i] = r;
  }

  return heights.reduce((acc, h, i) => {
    return Math.max(acc, h * (rightBound[i] - leftBound[i] - 1));
  }, 0);
};

test("[2,1,5,6,2,3]", () => {
  const r = largestRectangleArea([2, 1, 5, 6, 2, 3]);
  expect(r).toEqual(10);
});

test("[2,4]", () => {
  const r = largestRectangleArea([2, 4]);
  expect(r).toEqual(4);
});
