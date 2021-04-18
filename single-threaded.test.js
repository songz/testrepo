function Heap(tasks) {
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

  console.log(sortedTasks);

  this.getAvailable = (time, result = [], i = 0) => {
    if (
      i === 0 &&
      sortedTasks.length &&
      !result.length &&
      time < sortedTasks[0].start
    ) {
      time = sortedTasks[i].start;
    }
    while (sortedTasks.length && sortedTasks[0].start <= time) {
      result.push(sortedTasks.shift());
    }
    return { result, time };
  };

  this.delete = (element) => {
    const toDelete = sortedTasks.indexOf(element);
    sortedTasks.splice(toDelete, 1);
  };
}

const getResult = (tasks, h, t, result = []) => {
  let available = [];
  while (result.length !== tasks.length) {
    const availableResults = h.getAvailable(t, available);
    t = availableResults.time;
    const smallestTask = available.reduce((acc, task) => {
      if (acc.duration < task.duration) {
        return acc;
      }
      if (acc.duration === task.duration) {
        return acc.idx < task.idx ? acc : task;
      }
      return task;
    }, available[0]);
    //console.log(`available length: ${available.length}`);

    console.log(
      `picking up ${smallestTask.idx} at time ${t}. Task start ${smallestTask.start}`
    );
    const toDelete = available.indexOf(smallestTask);
    //console.log(`deleting index: ${toDelete}`);
    available.splice(toDelete, 1);
    result.push(smallestTask.idx);
    t = t + smallestTask.duration;
    //console.log(`done with task ${smallestTask.idx}, time: ${t}`);
  }
  return result;
};

const getOrder = function (tasks, result = []) {
  const h = new Heap(tasks);
  return getResult(tasks, h, 0);
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
