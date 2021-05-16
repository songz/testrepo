/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
var FindSumPairs = function (nums1, nums2) {
  this.map = nums1.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  this.nums2 = nums2;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
FindSumPairs.prototype.add = function (index, val) {
  this.nums2[index] += val;
};

/**
 * @param {number} tot
 * @return {number}
 */
FindSumPairs.prototype.count = function (tot) {
  return this.nums2.reduce((acc, num) => {
    const other = this.map[tot - num];
    if (!other) {
      return acc;
    }

    return acc + other;
  }, 0);
};

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */

test("given", () => {
  const findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);

  //pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
  expect(findSumPairs.count(7)).toEqual(8);

  // now nums2 = [1,4,5,4,5,4]
  findSumPairs.add(3, 2);

  //  pairs (5,2), (5,4) make 3 + 5
  expect(findSumPairs.count(8)).toEqual(2);

  // pair (5,0) makes 3 + 1
  expect(findSumPairs.count(4)).toEqual(1);

  findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
  findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]

  // pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4
  expect(findSumPairs.count(7)).toEqual(11);
});
