var optimize = function (arr, left = 0, right = arr.length - 1) {
  if (!arr.length) {
    console.log(arr[left]);
    return 0;
  }
  if (left === right) {
    console.log(arr[left]);
    return arr[left];
  }
  if (Math.abs(right - left) === 1) {
    console.log("left", left, right);
    return Math.max(arr[left], arr[right]);
  }

  return Math.max(
    arr[left] +
      Math.max(
        optimize(arr, left + 2, right),
        optimize(arr, left + 1, right - 1)
      ),

    arr[right] +
      Math.max(
        optimize(arr, left + 1, right - 1),
        optimize(arr, left, right - 2)
      )
  );
};

test.only("[5, 3, 7, 10]", () => {
  const r = optimize([5, 3, 7, 10]);
  expect(r.player1).toEqual(15);
});

/*
test("[8, 15, 3, 7]", () => {
  const r = optimize([8, 15, 3, 7]);
  expect(r).toEqual(22);
});

test("[15]", () => {
  const r = optimize([15]);
  expect(r).toEqual(15);
});

test("[15, 2]", () => {
  const r = optimize([15, 2]);
  expect(r).toEqual(15);
});
*/
