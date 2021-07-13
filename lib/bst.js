const buildTree = (nodes, queue) => {
  if (!queue.length) {
    return;
  }

  const node = queue.shift();
  node.left = nodes.shift();
  node.right = nodes.shift();

  if (node.left) {
    queue.push(node.left);
  }

  if (node.right) {
    queue.push(node.right);
  }
  return buildTree(nodes, queue);
};

const makeBst = (arr) => {
  if (!arr.length) {
    return null;
  }

  // Convert valid values to nodes
  const nodes = arr.map((value) => {
    if (value === null || value === undefined) {
      return null;
    }

    return {
      val: value,
    };
  });

  const root = nodes.shift();

  buildTree(nodes, [root]);
  return root;

  // assign each child to its parent
  nodes.forEach((node, i) => {
    if (!node || i === 0) {
      return;
    }

    const parentIdx = Math.floor((i - 1) / 2);
    const parent = nodes[parentIdx];

    // left is always odd
  });

  return nodes[0];
};

const makeArr = (node, result, id = 0) => {
  if (!node) {
    return;
  }

  result[id] = node.val;
  makeArr(node.left, result, id * 2 + 1);
  makeArr(node.right, result, id * 2 + 2);
};

const unmakeBst = (tree) => {
  if (!tree) {
    return [];
  }

  const result = [];
  makeArr(tree, result);

  return [...result].map((e) => {
    if (e === undefined) {
      return null;
    }
    return e;
  });
};

module.exports = {
  makeBst,
  unmakeBst,
};
