const { makeBst, unmakeBst } = require("./lib/bst");
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = function (root) {
  if (!root) return true;

  let valid = true;
  let lastNum = -Infinity;

  const checkValid = (nextNumber) => {
    // To check the order you are traversing, uncomment console.log
    //console.log(nextNumber);
    if (nextNumber <= lastNum) {
      valid = false;
    }
    lastNum = nextNumber;
  };

  const dfs = (node) => {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      checkValid(node.val);
      return node.val;
    }
    dfs(node.left);
    checkValid(node.val);
    dfs(node.right);
  };
  dfs(root);
  return valid;
};

test("[5,1,4,null,null,3,6]", () => {
  const inputTree = makeBst([5, 1, 4, null, null, 3, 6]);
  expect(isValidBST(inputTree)).toEqual(false);
});

test("[2,2,2]", () => {
  const inputTree = makeBst([2, 2, 2]);
  expect(isValidBST(inputTree)).toEqual(false);
});

test("[2,1,3]", () => {
  const inputTree = makeBst([2, 1, 3]);
  expect(isValidBST(inputTree)).toEqual(true);
});

test("[2,1,9,null,null,8,10]", () => {
  const inputTree = makeBst([2, 1, 9, null, null, 8, 10]);
  expect(isValidBST(inputTree)).toEqual(true);
});

test("[5,4,6,null,null,3,7]", () => {
  const inputTree = makeBst([5, 4, 6, null, null, 3, 7]);
  expect(isValidBST(inputTree)).toEqual(false);
});

test("[32,26,47,19,null,null,56,null,27] ", () => {
  const inputTree = makeBst([32, 26, 47, 19, null, null, 56, null, 27]);
  expect(isValidBST(inputTree)).toEqual(false);
});

test("[3,null,30,10,null,null,15,null,45] ", () => {
  const inputTree = makeBst([3, null, 30, 10, null, null, 15, null, 45]);
  expect(isValidBST(inputTree)).toEqual(false);
});

test("[30,20,40,15,25,35,45,10,18,21,28,32,38,42,50]", () => {
  const inputTree = makeBst([
    30,
    20,
    40,
    15,
    25,
    35,
    45,
    10,
    18,
    21,
    28,
    32,
    38,
    42,
    50,
  ]);
  expect(isValidBST(inputTree)).toEqual(true);
});
