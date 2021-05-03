function Heap(compare) {
  const state = [];

  const parent = (e) => {
    return Math.floor((e - 1) / 2);
  };

  const leftChild = (i) => {
    return 2 * i + 1;
  };

  const rightChild = (i) => {
    return leftChild(i) + 1;
  };

  this.add = function (element) {
    state.push(element);
    if (state.length === 1) {
      return;
    }
    let i = state.length - 1;
    while (i > 0 && compare(state[parent(i)], state[i])) {
      [state[i], state[parent(i)]] = [state[parent(i)], state[i]];
      i = parent(i);
    }
  };

  this.getSize = () => {
    return state.length;
  };

  this.getSmallest = () => {
    if (!state.length) return null;
    if (state.length === 1) {
      return state.pop();
    }
    const result = state[0];
    state[0] = state[state.length - 1];
    state.pop();
    let i = 0;
    while (
      (leftChild(i) < state.length && compare(state[i], state[leftChild(i)])) ||
      (rightChild(i) < state.length && compare(state[i], state[rightChild(i)]))
    ) {
      if (
        rightChild(i) < state.length &&
        compare(state[i], state[rightChild(i)]) &&
        compare(state[leftChild(i)], state[rightChild(i)])
      ) {
        [state[i], state[rightChild(i)]] = [state[rightChild(i)], state[i]];
        i = rightChild(i);
      } else {
        [state[i], state[leftChild(i)]] = [state[leftChild(i)], state[i]];
        i = leftChild(i);
      }
    }
    return result;
  };
}

var minInterval = function (intervals, queries) {
  const sorted = intervals.sort((a, b) => a[0] - b[0]);
  const iMap = sorted.reduce((acc, [s, e], i) => {
    acc[i] = e - s + 1;
    return acc;
  }, {});

  const getMinInterval = (num) => {
    let max = -1;
    for (let i = 0; i < intervals.length && intervals[i][0] <= num; i++) {
      if (intervals[i][1] >= num) {
        if (max === -1 || iMap[i] < max) {
          max = iMap[i];
        }
      }
    }
    return max;
  };

  return queries.map((q) => getMinInterval(q));
};

test("[[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", () => {
  const r = minInterval(
    [
      [1, 4],
      [2, 4],
      [3, 6],
      [4, 4],
    ],
    [2, 3, 4, 5]
  );
  expect(r).toEqual([3, 3, 1, 4]);
});

test("[[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]", () => {
  const r = minInterval(
    [
      [2, 3],
      [2, 5],
      [1, 8],
      [20, 25],
    ],
    [2, 19, 5, 22]
  );
  expect(r).toEqual([2, -1, 4, 6]);
});
