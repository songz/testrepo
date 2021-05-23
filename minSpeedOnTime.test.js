const getTime = (dist, speed) => {
  return dist.reduce((acc, d, i) => {
    if (i === dist.length - 1) {
      return acc + d / speed;
    }
    return acc + Math.ceil(d / speed);
  }, 0);
};

var minSpeedOnTime = function (dist, hour) {
  let n = dist.length;
  let min = 1;
  let max = 10_000_000;
  let ans = -1;

  while (min <= max) {
    const mid = Math.floor((max + min) / 2);
    const midTime = getTime(dist, mid);
    if (midTime > hour) {
      min = mid + 1;
    } else {
      ans = mid;
      max = mid - 1;
    }
  }

  return ans;
};

test("dist = [1,3,2], hour = 6", () => {
  const r = minSpeedOnTime([1, 3, 2], 6);
  expect(r).toEqual(1);
});

test("dist = [1,3,2], hour = 2.7", () => {
  const r = minSpeedOnTime([1, 3, 2], 2.7);
  expect(r).toEqual(3);
});

test("dist = [1,3,2], hour = 1.9", () => {
  const r = minSpeedOnTime([1, 3, 2], 1.9);
  expect(r).toEqual(-1);
});

test("dist = [1,1, 100000], hour = 2.01", () => {
  const r = minSpeedOnTime([1, 1, 100000], 2.01);
  expect(r).toEqual(10000000);
});

test("[5,3,4,6,2,2,7] 10.92", () => {
  const r = minSpeedOnTime([5, 3, 4, 6, 2, 2, 7], 10.92);
  expect(r).toEqual(4);
});
