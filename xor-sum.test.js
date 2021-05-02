function getXORSum(arr1, arr2) {
  let bits = 0;
  for (let shift = 0; shift < 32; shift++) {
    const bit = 1 << shift;
    const arr1BitCount = arr1.filter((x) => x & bit).length;
    const arr2BitCount = arr2.filter((x) => x & bit).length;
    const pairsWithBit = arr1BitCount * arr2BitCount;
    if (pairsWithBit % 2 === 1) {
      bits += bit;
    }
  }
  return bits;
}

test("arr1 = [1,2,3], arr2 = [6,5]", () => {
  const r = getXORSum([1, 2, 3], [6, 5]);
  expect(r).toEqual(0);
});

test("[12], [4]", () => {
  const r = getXORSum([12], [4]);
  expect(r).toEqual(4);
});

test("[1033....], [6386]", () => {
  const r = getXORSum(
    [1033, 4179, 1931, 8117, 7364, 7737, 6219, 3439, 1537, 7993],
    [6386]
  );
  expect(r).toEqual(128);
});
