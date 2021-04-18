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

  const firstMatch = s[0] === p[0] || p[0] === ".";
  if (p.length >= 2 && p[1] === "*") {
    return (
      isMatch(s, p.substring(2)) || (firstMatch && isMatch(s.substring(1), p))
    );
  }
  return firstMatch && isMatch(s.substring(1), p.substring(1));
};

test("hello and .....", () => {
  const result = isMatch("hello", ".....");
  expect(result).toEqual(true);
});

test("hello and hello", () => {
  const result = isMatch("hello", "hello");
  expect(result).toEqual(true);
});

test("hello and helLo", () => {
  const result = isMatch("hello", "helLo");
  expect(result).toEqual(false);
});

test("'' and c*", () => {
  const result = isMatch("", "c*");
  expect(result).toEqual(true);
});

test("'' and c*c*", () => {
  const result = isMatch("", "c*c*");
  expect(result).toEqual(true);
});

test("'aa' and a*", () => {
  const result = isMatch("", "c*c*");
  expect(result).toEqual(true);
});

test("'ab' and .*c", () => {
  const result = isMatch("", "c*c*");
  expect(result).toEqual(true);
});

test("mississippi and mis*is*p*.", () => {
  const result = isMatch("mississippi", "mis*is*p*.");
  expect(result).toEqual(false);
});
