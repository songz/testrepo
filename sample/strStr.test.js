/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  // if no pattern, then string should be ''
  if (!p) {
    return !s;
  }

  // str is empty, so only viable case is x*x* (ends with *)
  //     so keep taking off the _* prefix until hits base case (empty pattern)
  if (!s.length) {
    return p[1] === "*" && isMatch(s, p.substring(2));
  }
};

test("hello, .....", () => {
  const result = isMatch("hello", ".....");
  expect(result).toEqual(true);
});
