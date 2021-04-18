function SmallestTasks(compare) {
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

const getResult = (tasks, t, result = []) => {
  const sortedTasks = tasks
    .map((n, i) => {
      return {
        start: n[0],
        duration: n[1],
        idx: i,
      };
    })
    .sort((a, b) => {
      return a.start - b.start;
    });

  let available = new SmallestTasks((parent, e) => {
    console.log(`comparing parent ${parent.duration}, with e ${e.duration}`);
    // return true = swap
    if (e.duration < parent.duration) {
      return true;
    }
    if (parent.duration === e.duration) {
      return e.idx < parent.idx;
    }
    return false;
  });
  while (result.length !== tasks.length) {
    if (
      sortedTasks.length &&
      !available.getSize() &&
      t < sortedTasks[0].start
    ) {
      t = sortedTasks[0].start;
    }
    while (sortedTasks.length && sortedTasks[0].start <= t) {
      available.add(sortedTasks.shift());
    }

    const smallestTask = available.getSmallest();
    console.log(
      `smallestTask is ${smallestTask.start}, ${smallestTask.duration}, at ${t}`
    );

    result.push(smallestTask.idx);
    t = t + smallestTask.duration;
  }
  return result;
};

const getOrder = function (tasks, result = []) {
  return getResult(tasks, 0);
};

test("loooongeinput", () => {
  const r = getOrder([
    [35, 36],
    [11, 7],
    [15, 47],
    [34, 2],
    [47, 19],
    [16, 14],
    [19, 8],
    [7, 34],
    [38, 15],
    [16, 18],
    [27, 22],
    [7, 15],
    [43, 2],
    [10, 5],
    [5, 4],
    [3, 11],
  ]);
  expect(r).toEqual([15, 14, 13, 1, 6, 3, 5, 12, 8, 11, 9, 4, 10, 7, 0, 2]);
});

test("[[19,13],[16,9],[21,10],[32,25],[37,4],[49,24],[2,15],[38,41],[37,34],[33,6],[45,4],[18,18],[46,39],[12,24]]", () => {
  const r = getOrder([
    [19, 13],
    [16, 9],
    [21, 10],
    [32, 25],
    [37, 4],
    [49, 24],
    [2, 15],
    [38, 41],
    [37, 34],
    [33, 6],
    [45, 4],
    [18, 18],
    [46, 39],
    [12, 24],
  ]);
  expect(r).toEqual([6, 1, 2, 9, 4, 10, 0, 11, 5, 13, 3, 8, 12, 7]);
});

test("[[23,40],[10,32],[12,18],[10,39],[25,4],[18,12],[38,18],[36,1],[26,5],[45,35],[5,43],[19,19],[46,41],[25,22],[29,17],[26,33],[49,45],[43,44],[50,2]]", () => {
  const r = getOrder([
    [23, 40],
    [10, 32],
    [12, 18],
    [10, 39],
    [25, 4],
    [18, 12],
    [38, 18],
    [36, 1],
    [26, 5],
    [45, 35],
    [5, 43],
    [19, 19],
    [46, 41],
    [25, 22],
    [29, 17],
    [26, 33],
    [49, 45],
    [43, 44],
    [50, 2],
  ]);
  expect(r).toEqual([
    10,
    7,
    4,
    18,
    8,
    5,
    14,
    2,
    6,
    11,
    13,
    1,
    15,
    9,
    3,
    0,
    12,
    17,
    16,
  ]);
});

test("[[1,3],[1,4],[2,1]]", () => {
  const r = getOrder([
    [1, 3],
    [1, 4],
    [2, 1],
  ]);
  expect(r).toEqual([0, 2, 1]);
});

test("[[1,2],[2,4],[3,2],[4,1]]", () => {
  const r = getOrder([
    [1, 2],
    [2, 4],
    [3, 2],
    [4, 1],
  ]);
  expect(r).toEqual([0, 2, 3, 1]);
});
