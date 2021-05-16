var maxSumMinProduct = function (nums) {
  const leftBound = new Array(nums.length);
  const rightBound = new Array(nums.length);
  leftBound[0] = { idx: -1, sum: 0 };
  rightBound[nums.length - 1] = { idx: nums.length, sum: 0 };

  for (let i = 1; i < nums.length; i++) {
    let idx = i - 1;
    let sum = 0;

    while (idx >= 0 && nums[idx] >= nums[i]) {
      sum += nums[idx] + leftBound[idx].sum;
      idx = leftBound[idx].idx;
    }

    leftBound[i] = {
      idx,
      sum,
    };
  }

  for (let i = nums.length - 2; i >= 0; i--) {
    let idx = i + 1;
    let sum = 0;

    if (i === 1) {
      console.group();
    }
    while (idx < nums.length && nums[idx] >= nums[i]) {
      sum += nums[idx] + rightBound[idx].sum;
      idx = rightBound[idx].idx;
    }

    rightBound[i] = {
      idx,
      sum,
    };
  }

  console.log(rightBound);
  console.log(leftBound);

  const max = nums.reduce((acc, num, idx) => {
    const value =
      BigInt(num) * BigInt(leftBound[idx].sum + num + rightBound[idx].sum);
    if (acc > value) return acc;
    return value;
  }, BigInt(0));

  return Number(max % BigInt(1000000000 + 7));
};

test("[1,2,3,2]", () => {
  const r = maxSumMinProduct([1, 2, 3, 2]);
  expect(r).toEqual(14);
});

test("[2,3,3,1,2]", () => {
  const r = maxSumMinProduct([2, 3, 3, 1, 2]);
  expect(r).toEqual(18);
});

test.only("[3,1,5,6,4,2]", () => {
  const r = maxSumMinProduct([3, 1, 5, 6, 4, 2]);
  expect(r).toEqual(60);
});

test("[2,5,4,2,4,5,3,1,2,4]", () => {
  const r = maxSumMinProduct([2, 5, 4, 2, 4, 5, 3, 1, 2, 4]);
  expect(r).toEqual(50);
});
