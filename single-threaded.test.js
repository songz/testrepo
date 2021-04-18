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

  this.getAvailable = (time, result = [], i = 0) => {
    if (i === 0 && time < sortedTasks[i].start) {
      time = sortedTasks[i].start;
    }
    if (i >= sortedTasks.length || time < sortedTasks[i].start) {
      return { result, time };
    }
    result.push(sortedTasks[i]);
    return this.getAvailable(time, result, i + 1);
  };

  this.delete = (element) => {
    const toDelete = sortedTasks.indexOf(element);
    sortedTasks.splice(toDelete, 1);
  };
}

const getResult = (tasks, h, t, result = []) => {
  if (result.length === tasks.length) {
    return result;
  }
  const availableResults = h.getAvailable(t);
  const available = availableResults.result;
  t = availableResults.time;
  const sortedByDuration = available.sort((a, b) => {
    const diff = a.duration - b.duration;
    return diff;
  });
  const sortedAvailable = sortedByDuration
    .filter((d) => d.duration === sortedByDuration[0].duration)
    .sort((a, b) => {
      return a.idx - b.idx;
    });
  console.log(sortedAvailable);
  result.push(sortedAvailable[0].idx);
  h.delete(sortedAvailable[0]);
  //console.log(`time ${t}`, JSON.stringify(result, null, 2));
  return getResult(tasks, h, t + sortedAvailable[0].duration, result);
};

const getOrder = function (tasks, result = []) {
  const h = new Heap(tasks);
  return getResult(tasks, h, 0);
};

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
