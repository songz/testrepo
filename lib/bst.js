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
      value,
    };
  });

  // assign each child to its parent
  nodes.forEach((node, i) => {
    if (!node || i === 0) {
      return;
    }

    const parentIdx = Math.floor((i - 1) / 2);
    const parent = nodes[parentIdx];

    // left is always odd
    if (i % 2) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  });

  return nodes[0];
};

const makeArr = (node, result, id = 0) => {
  if (!node) {
    return;
  }

  result[id] = node.value;
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
