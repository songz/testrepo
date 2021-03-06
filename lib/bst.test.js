const { makeBst, unmakeBst } = require("./bst.js");

describe("makeBst", () => {
  test("one node", () => {
    const result = makeBst([2]);
    expect(result.val).toEqual(2);
    expect(result.left).not.toBeTruthy();
    expect(result.right).not.toBeTruthy();
  });

  test("two nodes", () => {
    const result = makeBst([2, 1]);
    expect(result.val).toEqual(2);
    expect(result.left.val).toEqual(1);

    expect(result.left.left).not.toBeTruthy();
    expect(result.left.right).not.toBeTruthy();
    expect(result.right).not.toBeTruthy();
  });

  test("three nodes", () => {
    const result = makeBst([2, 1, 3]);
    expect(result.val).toEqual(2);
    expect(result.left.val).toEqual(1);
    expect(result.right.val).toEqual(3);
  });

  test("5 nodes with nulls: [5, 1, 4, null, null, 3, 6]", () => {
    const result = makeBst([5, 1, 4, null, null, 3, 6]);
    expect(result.val).toEqual(5);
    expect(result.left.val).toEqual(1);
    expect(result.left.left).not.toBeTruthy();
    expect(result.left.right).not.toBeTruthy();

    expect(result.right.val).toEqual(4);
    expect(result.right.left.val).toEqual(3);
    expect(result.right.left.left).not.toBeTruthy();
    expect(result.right.left.right).not.toBeTruthy();

    expect(result.right.right.val).toEqual(6);
    expect(result.right.right.left).not.toBeTruthy();
    expect(result.right.right.right).not.toBeTruthy();
  });

  test("nulls", () => {
    const result = makeBst([30, null, 30, 10, null, null, 15, null, 45]);
    expect(result.val).toEqual(30);
    expect(result.left).not.toBeTruthy();

    const rightNode = result.right;
    expect(rightNode.val).toEqual(30);
    expect(rightNode.left.val).toEqual(10);
    expect(rightNode.right).not.toBeTruthy();

    expect(result.right.left.right.right.val).toEqual(45);
  });
});

// now that we know makeBst works (above),
// we can use that as a helper to test unmakeBst

describe("unmakeBst", () => {
  test("unmake 1 node", () => {
    const tree = makeBst([2]);
    const result = unmakeBst(tree);
    expect(result).toEqual([2]);
  });
  test("5 nodes with nulls: [5, 1, 4, null, null, 3, 6]", () => {
    const tree = makeBst([5, 1, 4, null, null, 3, 6]);
    const result = unmakeBst(tree);
    expect(result).toEqual([5, 1, 4, null, null, 3, 6]);
  });

  test("6 nodes with nulls: [3,2,5,1,null,4]", () => {
    const tree = makeBst([3, 2, 5, 1, null, 4]);
    const result = unmakeBst(tree);
    expect(result).toEqual([3, 2, 5, 1, null, 4]);
  });

  test("Complex: [3,null,30,10,null,null,15,null,45]", () => {
    const tree = makeBst([3, null, 30, 10, null, null, 15, null, 45]);
    const result = unmakeBst(tree);
    expect(result).toEqual([3, null, 30, 10, null, null, 15, null, 45]);
  });
});
