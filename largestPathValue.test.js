const alphabetMap = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

const largestPathValue = function (colors, edges) {
  const outGoingEdges = {};
  const n = colors.length;

  // Number of edges coming in
  const indegree = Array(n).fill(0);

  // build graph and indegrees too see start of graph
  edges.forEach(([start, next]) => {
    if (!outGoingEdges[start]) {
      outGoingEdges[start] = [];
    }
    outGoingEdges[start].push(next);
    indegree[next] += 1;
  });

  // prepping bfs
  const queue = [];
  const nodeColors = indegree.map(() => {
    return { ...alphabetMap };
  });

  // get the starting graphs
  indegree.forEach((degree, i) => {
    if (degree) {
      return;
    }

    queue.push(i);
    nodeColors[i][colors[i]] = 1;
  });

  if (!queue.length) {
    return -1;
  }

  let result = 0;
  let seen = 0;

  const visited = {};
  while (queue.length) {
    const node = queue.shift();
    visited[node] = true;

    result = Math.max(result, ...Object.values(nodeColors[node]));
    seen += 1;

    const nextEdges = outGoingEdges[node] || [];
    nextEdges.forEach((next) => {
      // Each next edge should build on top of current map
      Object.keys(nodeColors[next]).forEach((alph) => {
        const addition = alph === colors[next] ? 1 : 0;
        nodeColors[next][alph] = Math.max(
          nodeColors[next][alph],
          nodeColors[node][alph] + addition
        );
      });

      indegree[next] -= 1;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    });
  }

  if (seen < colors.length) {
    return -1;
  }

  return result;
};

test('colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]', () => {
  const result = largestPathValue("abaca", [
    [0, 1],
    [0, 2],
    [2, 3],
    [3, 4],
  ]);
  expect(result).toEqual(3);
});

test('colors = "a", edges = [[0,0]]', () => {
  const result = largestPathValue("a", [[0, 0]]);
  expect(result).toEqual(-1);
});

test('colors = "ab", edges = [[0,1], [1,1]]', () => {
  const result = largestPathValue("ab", [
    [0, 1],
    [1, 1],
  ]);
  expect(result).toEqual(-1);
});

test('"iivvvvv" [[0,1],[1,2],[1,3],[2,3],[3,4],[2,4],[3,5],[1,5],[4,5],[5,6]]', () => {
  const result = largestPathValue("iivvvvv", [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [2, 4],
    [3, 5],
    [1, 5],
    [4, 5],
    [5, 6],
  ]);
  expect(result).toEqual(5);
});

test('"hhqhuqhqff" [[0,1],[0,2],[2,3],[3,4],[3,5],[5,6],[2,7],[6,7],[7,8],[3,8],[5,8],[8,9],[3,9],[6,9]]', () => {
  const result = largestPathValue("hhqhuqhqff", [
    [0, 1],
    [0, 2],
    [2, 3],
    [3, 4],
    [3, 5],
    [5, 6],
    [2, 7],
    [6, 7],
    [7, 8],
    [3, 8],
    [5, 8],
    [8, 9],
    [3, 9],
    [6, 9],
  ]);
  expect(result).toEqual(3);
});
