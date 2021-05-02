/**
 *  @param {string} num
 *  @param {number} k
 *  @return {number}
 */

//xnum = 2
//[5,4,8,9,3,5,5, i 1,4,]

//"5489355142"
const findNext = (num) => {
  let left = num.length - 2;
  // `left` is the right-most value that's not in the maxed out subset
  // `left` is the first value that is lower than the value to its direct right
  while (left >= 0 && num[left] >= num[left + 1]) {
    left -= 1;
  }
  let right = num.length - 1;
  // Since the right side is maxed out, it increases from right to left, so
  // we can find the minimum value that's greater than num[left] by going right
  // to left until we find a value that's greater.
  while (num[left] >= num[right]) {
    right -= 1;
  }
  // swap those values
  [num[left], num[right]] = [num[right], num[left]];
  left += 1;
  right = num.length - 1;
  // now reverse the maxed out subset so that it's now a minimum subset
  while (left < right) {
    [num[left], num[right]] = [num[right], num[left]];
    left += 1;
    right -= 1;
  }
  return num;
};

const numSwaps = (s1, s2) => {
  let i = 0;
  let ans = 0;
  while (i < s1.length) {
    let j = i;
    while (j < s1.length && s1[j] != s2[i]) {
      //console.log(j, s1[j], s2[i]);
      j += 1;
    }
    while (i < j) {
      const as1 = s1.split("");
      const tmp = as1[j];
      as1[j] = as1[j - 1];
      as1[j - 1] = tmp;
      j -= 1;
      ans += 1;
      s1 = as1.join("");
      //console.log(`ans: ${ans}`);
    }
    i += 1;
  }
  return ans;
};

var getMinSwaps = function (num, k) {
  let numArr = num.split("").map((c) => parseInt(c));
  while (k > 0) {
    numArr = findNext(numArr);
    k -= 1;
  }
  const numVal = numArr.join("");

  return numSwaps(num, numVal);
};

test("5489355142, 4", () => {
  const r = getMinSwaps("5489355142", 4);
  expect(r).toEqual(2);
});

test("11112, 4", () => {
  const r = getMinSwaps("11112", 4);
  expect(r).toEqual(4);
});

test("00123, 1", () => {
  const r = getMinSwaps("00123", 1);
  expect(r).toEqual(1);
});

test("948635 64", () => {
  // 986435
  const r = getMinSwaps("948635", 64);
  expect(r).toEqual(5);
});
