const { makeBst, unmakeBst } = require("./lib/bst");

// https://leetcode.com/problems/validate-binary-search-tree/
var isValidBST = function (root) {
  if (!root) return true;

  const arr = [];
  const buildArr = (node) => {
    if (!node.left && !node.right) {
      arr.push(node.val);
      return node.val;
    }
    node.left && buildArr(node.left);
    arr.push(node.val);
    node.right && buildArr(node.right);
  };
  buildArr(root);

  return arr.reduce((acc, num, i) => {
    if (i === 0) {
      return acc;
    }
    if (arr[i - 1] >= num) {
      return false;
    }
    return acc;
  }, true);
};

var canMerge = function (trees) {
  // Make a count of all the node values
  const nodeCounter = trees.reduce((acc, node) => {
    acc[node.val] = (acc[node.val] || 0) + 1;
    if (node.left) {
      const left = node.left;
      acc[left.val] = (acc[left.val] || 0) + 1;
    }
    if (node.right) {
      const right = node.right;
      acc[right.val] = (acc[right.val] || 0) + 1;
    }
    return acc;
  }, {});

  // We expect there to be only 1 main tree, where the
  //   root value count is 1
  const mainTrees = trees.filter((t) => {
    return nodeCounter[t.val] === 1;
  });

  if (mainTrees.length != 1) {
    return null;
  }

  // There could be a circular tree and a good tree.
  //   Build up the good tree.
  //   If all the root nodes are not used up, that means there's a circular tree
  const resultTree = mainTrees[0];
  const rootMap = trees.reduce((acc, node) => {
    acc[node.val] = node;
    return acc;
  }, {});

  buildTree = (node) => {
    if (node.left && rootMap[node.left.val]) {
      node.left = rootMap[node.left.val];
      delete rootMap[node.left.val];
      buildTree(node.left);
    }
    if (node.right && rootMap[node.right.val]) {
      node.right = rootMap[node.right.val];
      delete rootMap[node.right.val];
      buildTree(node.right);
    }
  };
  buildTree(resultTree);

  // circular tree exist
  if (Object.keys(rootMap).length != 1) {
    return null;
  }

  if (isValidBST(resultTree)) {
    return resultTree;
  }
  return null;
};

test("[[2,1],[3,2,5],[5,4]]", () => {
  const treeArr = [
    [2, 1],
    [3, 2, 5],
    [5, 4],
  ].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([3, 2, 5, 1, null, 4]);
});

test("[[2,1,3]]", () => {
  const treeArr = [[2, 1, 3]].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([2, 1, 3]);
});

test("[[2,1,3], [3,2]]", () => {
  const treeArr = [
    [2, 1, 3],
    [3, 2],
  ].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([]);
});

test("[[5,4],[3]]", () => {
  const treeArr = [[5, 4], [3]].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([]);
});

test("[[5,3,8],[3,2,6]]", () => {
  const treeArr = [
    [5, 3, 8],
    [3, 2, 6],
  ].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([]);
});

test("[[1,null,3],[3,1],[4,2]]", () => {
  const treeArr = [
    [1, null, 3],
    [3, 1],
    [4, 2],
  ].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([]);
});

test("[[10,9],[9,8],[8,7]]", () => {
  const treeArr = [
    [10, 9],
    [9, 8],
    [8, 7],
  ].map((t) => {
    return makeBst(t);
  });
  const resultTree = canMerge(treeArr);
  expect(unmakeBst(resultTree)).toEqual([10, 9, null, 8, null, 7]);
});
