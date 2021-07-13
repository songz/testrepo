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
};

const bfs = (level, result) => {
  const nextLevel = level.reduce((acc, n) => {
    return acc.concat(n.left || null, n.right || null);
  }, []);

  const nextNodes = nextLevel.filter((n) => n);
  if (!nextNodes.length) {
    return result;
  }

  const nextValues = nextLevel.map((n) => {
    if (!n) {
      return n;
    }
    return n.val;
  });
  return bfs(nextNodes, [...result, ...nextValues]);
};

const unmakeBst = (tree) => {
  if (!tree) {
    return [];
  }

  const result = bfs([tree], [tree.val]);

  // Get rid of the trailing null.
  //   Specifically, this case: [3,2,5,1,null,4]
  //   Mentioned in the output of this problem:
  //   https://leetcode.com/problems/merge-bsts-to-create-single-bst/
  if (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
};

module.exports = {
  makeBst,
  unmakeBst,
};
