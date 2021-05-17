function length([left, right]) {
  return right - left + 1;
}

function minInterval(intervals, queries) {
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  const indexedQueries = queries
    .map((query, index) => ({ query, index }))
    .sort((a, b) => a.query - b.query);
  const heap = new Heap((left, right) => length(right) < length(left));
  const results = queries.map(() => -1);
  let i = 0;
  for (const { query, index } of indexedQueries) {
    while (i < intervals.length && intervals[i][0] <= query) {
      heap.push(intervals[i]);
      i += 1;
    }
    while (heap.length() > 0 && heap.top()[1] < query) {
      heap.pop();
    }
    if (heap.length() > 0) {
      results[index] = length(heap.top());
    }
  }
  return results;
}

function Heap(isRightHigherPriority) {
  const parent = (i) => {
    return Math.floor((i - 1) / 2);
  };
  const leftChild = (i) => {
    return i * 2 + 1;
  };
  const rightChild = (i) => {
    return leftChild(i) + 1;
  };
  let state = [];
  this.push = (e) => {
    state.push(e);
    if (state.length === 1) {
      return;
    }

    let i = state.length - 1;
    while (i > 0 && isRightHigherPriority(state[parent(i)], state[i])) {
      const parentI = parent(i);
      [state[i], state[parentI]] = [state[parentI], state[i]];
      i = parentI;
    }
  };

  this.pop = () => {
    if (!state.length) return null;
    if (state.length === 1) {
      return state.pop();
    }
    const result = state[0];
    state[0] = state[state.length - 1];
    state.pop();

    let i = 0;
    while (
      (leftChild(i) < state.length &&
        isRightHigherPriority(state[i], state[leftChild(i)])) ||
      (rightChild(i) < state.length &&
        isRightHigherPriority(state[i], state[rightChild(i)]))
    ) {
      const ri = rightChild(i);
      const rc = state[ri];

      const li = leftChild(i);
      const lc = state[li];
      if (
        ri < state.length &&
        isRightHigherPriority(state[i], rc) &&
        isRightHigherPriority(lc, rc)
      ) {
        [state[i], state[ri]] = [state[ri], state[i]];
        i = ri;
      } else {
        [state[i], state[li]] = [state[li], state[i]];
        i = li;
      }
    }
    return result;
  };

  this.length = () => {
    return state.length;
  };
  this.top = () => {
    return state[0];
  };
}

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
