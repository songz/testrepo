var splitString = function (word) {
  const split = (str, prev) => {
    //console.log("str, prev", str, prev);
    if (!str) return true;
    for (let i = 1; i < word.length; i++) {
      const num = parseInt(str.substring(str.length - i));
      if (num === prev + 1) {
        const remainder = str.substring(0, str.length - i);
        if (split(remainder, num)) {
          return true;
        }
      }
    }
    return false;
  };
  for (let i = 1; i < word.length; i++) {
    const remainder = word.substring(0, word.length - i);
    const parsed = word.substring(word.length - i);
    if (split(remainder, parseInt(parsed))) {
      return true;
    }
  }
  return false;
};

test("1234", () => {
  const r = splitString("1234");
  expect(r).toEqual(false);
});

test("050043", () => {
  const r = splitString("050043");
  expect(r).toEqual(true);
});

test("10009998", () => {
  const r = splitString("10009998");
  expect(r).toEqual(true);
});

test("9080701", () => {
  const r = splitString("9080701");
  expect(r).toEqual(false);
});
