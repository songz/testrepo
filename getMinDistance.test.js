/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function (nums, target, start) {
  for (i = 0; i <= nums.length; i++) {
    const left = start - i;
    if (left >= 0 && nums[left] === target) {
      return i;
    }

    const right = start + i;
    if (right < nums.length && nums[right] === target) {
      return i;
    }
  }
};

test("[1,2,3,4,5], 5, 3", () => {
  const r = getMinDistance([1, 2, 3, 4, 5], 5, 3);
  expect(r).toEqual(1);
});

test("[1], 1, 0", () => {
  const r = getMinDistance([1], 1, 0);
  expect(r).toEqual(0);
});

test("[1,1,1,1,1,1,1,1,1,1], 1, 0", () => {
  const r = getMinDistance([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1, 0);
  expect(r).toEqual(0);
});
