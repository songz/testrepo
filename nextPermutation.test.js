var nextPermutation = function (arr) {
  let i = arr.length - 2;

  // find the pivot where arr[i] is not bigger than arr[i]+1
  while (i >= 0 && arr[i] >= arr[i + 1]) {
    console.log(`comparing ${arr[i]}, ${arr[i + 1]}---idx ${i}`);
    i -= 1;
  }

  if (i < 0) {
    return arr.reverse();
  }

  // find the number greater than arr[i] from the back
  let j = arr.length - 1;
  // Due to how we got i, there will always be a number greater than arr[i] at index > i
  while (arr[j] <= arr[i]) {
    j -= 1;
  }

  // swap!
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;

  /* swap in place
  for (let k = 1; (i+k) < arr.length && arr.length - k > i + k; k++) {
      const t = arr[i + k]
      arr[i+k] = arr[arr.length - k]
      arr[arr.length - k] = t
  }
  */

  const prefix = arr.slice(0, i);
  const suffix = arr.slice(i + 1);
  return [...prefix, arr[i], ...suffix.reverse()];
};

test("[1,2,3]", () => {
  const r = nextPermutation([1, 2, 3]);
  expect(r).toEqual([1, 3, 2]);
});

test("[1,3,2]", () => {
  const r = nextPermutation([1, 3, 2]);
  expect(r).toEqual([2, 1, 3]);
});

test("[3,2,1]", () => {
  const r = nextPermutation([3, 2, 1]);
  expect(r).toEqual([1, 2, 3]);
});

test("[0,1,2,5,3,3,0]", () => {
  const r = nextPermutation([0, 1, 2, 5, 3, 3, 0]);
  expect(r).toEqual([0, 1, 3, 0, 2, 3, 5]);
});
