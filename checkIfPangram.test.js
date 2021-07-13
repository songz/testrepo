/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  const map = "abcdefghijklmnopqrstuvwxyz".split("").reduce((acc, e) => {
    acc[e] = false;
    return acc;
  }, {});
  sentence.split("").forEach((c) => {
    map[c] = true;
  });
  return Object.values(map).reduce((acc, e) => {
    if (!acc) return acc;
    if (!e) {
      return false;
    }
    return true;
  }, true);
};

test("leetcode", () => {
  const r = checkIfPangram("leetcode");
  expect(r).toEqual(false);
});

test("thequickbrownfoxjumpsoverthelazydog", () => {
  const r = checkIfPangram("thequickbrownfoxjumpsoverthelazydog");
  expect(r).toEqual(true);
});
