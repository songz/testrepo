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

const assignTasks = (servers, tasks) => {
  const serverHeap = new Heap((a, b) => {
    if (a.weight === b.weight) {
      return a.idx > b.idx;
    }
    return a.weight > b.weight;
  });
  servers.forEach((s, i) => {
    serverHeap.push({
      idx: i,
      weight: s,
    });
  });

  const busyServers = new Heap((a, b) => {
    if (a.endTime !== b.endTime) {
      return a.endTime > b.endTime;
    }
    if (a.weight !== b.weight) {
      return a.weight > b.weight;
    }
    return a.idx > b.idx;
  });

  const result = [];

  for (let i = 0; i < tasks.length; i++) {
    while (busyServers.length() && busyServers.top().endTime <= i) {
      const freedServer = busyServers.pop();
      serverHeap.push({
        idx: freedServer.idx,
        weight: freedServer.weight,
      });
    }

    if (!serverHeap.length()) {
      const freedServer = busyServers.pop();
      busyServers.push({
        idx: freedServer.idx,
        weight: freedServer.weight,
        endTime: tasks[i] + freedServer.endTime,
      });
      result.push(freedServer.idx);
    } else {
      const server = serverHeap.pop();
      result.push(server.idx);

      busyServers.push({
        idx: server.idx,
        weight: server.weight,
        endTime: tasks[i] + i,
      });
    }
  }
  return result;
};

test("servers = [3,3,2], tasks = [1,2,3,2,1,2]", () => {
  const result = assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2]);
  expect(result).toEqual([2, 2, 0, 2, 1, 2]);
});

test("servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]", () => {
  const result = assignTasks([5, 1, 4, 3, 2], [2, 1, 2, 4, 5, 2, 1]);
  expect(result).toEqual([1, 4, 1, 4, 1, 3, 2]);
});

test("[10,63,95,16,85,57,83,95,6,29,71] [70,31,83,15,32,67,98,65,56,48,38,90,5]", () => {
  const result = assignTasks(
    [10, 63, 95, 16, 85, 57, 83, 95, 6, 29, 71],
    [70, 31, 83, 15, 32, 67, 98, 65, 56, 48, 38, 90, 5]
  );
  expect(result).toEqual([8, 0, 3, 9, 5, 1, 10, 6, 4, 2, 7, 9, 0]);
});

test("[74,57,61,82,67,97,67,21,61,79,21,50,14,88,48,52,76,64] [21,100,48,64,20,8,28,10,3,63,7]", () => {
  const result = assignTasks(
    [74, 57, 61, 82, 67, 97, 67, 21, 61, 79, 21, 50, 14, 88, 48, 52, 76, 64],
    [21, 100, 48, 64, 20, 8, 28, 10, 3, 63, 7]
  );
  expect(result).toEqual([12, 7, 10, 14, 11, 15, 1, 2, 8, 17, 4]);
});

test("[31,96,73,90,15,11,1,90,72,9,30,88] [87,10,3,5,76,74,38,64,16,64,93,95,60,79,54,26,30,44,64,71]", () => {
  const result = assignTasks(
    [31, 96, 73, 90, 15, 11, 1, 90, 72, 9, 30, 88],
    [
      87,
      10,
      3,
      5,
      76,
      74,
      38,
      64,
      16,
      64,
      93,
      95,
      60,
      79,
      54,
      26,
      30,
      44,
      64,
      71,
    ]
  );
  expect(result).toEqual([
    6,
    9,
    5,
    4,
    10,
    5,
    0,
    8,
    4,
    2,
    11,
    9,
    3,
    7,
    1,
    4,
    0,
    4,
    1,
    8,
  ]);
});
