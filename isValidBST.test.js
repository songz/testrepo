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

  // console.log(arr) // arr should be sorted

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
