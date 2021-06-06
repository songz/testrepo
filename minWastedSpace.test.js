const binarySearch = (arr, num, start = 0) => {
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((end + start) / 2);
    if (arr[mid] < num) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return start;
};

var minWastedSpace = function (packages, suppliers) {
  const sortedPackages = packages.sort((a, b) => a - b);
  const packageSum = packages.reduce((acc, e) => acc + e, 0);

  const minBoxesWeight = suppliers.reduce((acc, unsortedBoxes) => {
    const boxes = unsortedBoxes.sort((a, b) => a - b);

    if (boxes[boxes.length - 1] < sortedPackages[sortedPackages.length - 1]) {
      return acc;
    }

    let packageIdx = 0;
    const boxTotalWeight = boxes.reduce((acc, box) => {
      const idx = binarySearch(packages, box + 1, packageIdx);
      const numPackages = idx - packageIdx;

      packageIdx = idx;
      return acc + box * numPackages;
    }, 0);

    if (acc < 0) {
      return boxTotalWeight;
    }
    return Math.min(boxTotalWeight, acc);
  }, -1);

  if (minBoxesWeight < 0) {
    return minBoxesWeight;
  }
  return (minBoxesWeight - packageSum) % 1_000_000_007;
};

test("packages = [2,3,5], boxes = [[4,8],[2,8]]", () => {
  const r = minWastedSpace(
    [2, 3, 5],
    [
      [4, 8],
      [2, 8],
    ]
  );
  expect(r).toEqual(6);
});

test("packages = [2,3,5], boxes = [[1,4],[2,3],[3,4]]", () => {
  const r = minWastedSpace(
    [2, 3, 5],
    [
      [1, 4],
      [2, 3],
      [3, 4],
    ]
  );
  expect(r).toEqual(-1);
});

test("packages = [3,5,8,10,11,12], boxes = [[12],[11,9],[10,5,14]]", () => {
  const r = minWastedSpace([3, 5, 8, 10, 11, 12], [[12], [11, 9], [10, 5, 14]]);
  expect(r).toEqual(9);
});
