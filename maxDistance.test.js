const binarySearch = (arr, num, start = 0) => {
  let end = arr.length - 1;

  while (end - start > 1) {
    const mid = Math.floor((end + start) / 2);
    if (num <= arr[mid]) {
      start = mid;
    } else {
      end = mid;
    }
  }

  if (start === end) {
    return start;
  }
  return num <= arr[end] ? end : start;
};

/**
 *  * @param {number[]} nums1
 *   * @param {number[]} nums2
 *    * @return {number}
 *     */
var maxDistance = function (nums1, nums2) {
  let max = 0;
  for (let i = 0; i < nums1.length; i++) {
    const newJ = binarySearch(nums2, nums1[i], i);
    if (newJ - i > max) {
      max = newJ - i;
    }
  }
  return max;
};

test("nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]", () => {
  const r = maxDistance([55, 30, 5, 4, 2], [100, 20, 10, 10, 5]);
  expect(r).toEqual(2);
});

test("nums1 = [2,2,2], nums2 = [10,10,1]", () => {
  const r = maxDistance([2, 2, 2], [10, 10, 1]);
  expect(r).toEqual(1);
});

test("nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]", () => {
  const r = maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25]);
  expect(r).toEqual(2);
});

test("nums1 = [5,4], nums2 = [3,2]", () => {
  const r = maxDistance([5, 4], [3, 2]);
  expect(r).toEqual(0);
});
