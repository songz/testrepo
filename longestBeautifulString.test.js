/*
var longestBeautifulSubstring = function (word) {
  const vowels = ["a", "e", "i", "o", "u"];
  let vowelIdx = 0;
  let isCurrentVowelVisited = false;
  let i = 0;
  let longest = 0;
  let result = 0;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    if (isCurrentVowelVisited && char === vowels[vowelIdx + 1]) {
      vowelIdx += 1;
      isCurrentVowelVisited = true;
      longest += 1;
    } else if (char === vowels[vowelIdx]) {
      isCurrentVowelVisited = true;
      longest += 1;
    } else {
      if (
        char !== vowels[vowelIdx] &&
        isCurrentVowelVisited &&
        char !== vowels[vowelIdx + 1]
      ) {
        if (vowelIdx >= 4) {
          result = longest > result ? longest : result;
        }
      }

      vowelIdx = 0;
      isCurrentVowelVisited = false;
      longest = 0;
      if (char === "a") {
        longest = 1;
        isCurrentVowelVisited = true;
      }
    }
  }

  if (vowelIdx >= 4 && longest > result) return longest;

  return result;
};
*/

var longestBeautifulSubstring = function (word) {
  const matches = word.match(/a+e+i+o+u+/g) || [];
  const results = [...matches, ""];
  return Math.max(...results.map((e) => e.length));
};

/* Bryan's solution
function longestBeautifulSubstring(word: string): number {
    const chars = { "": 0, "a": 1, "e": 2, "i": 3, "o": 4, "u": 5 };
    let maxBeautiful = 0;
    let current = "";
    let start = 0;
    for (let i = 0; i < word.length; i++) {
        if (chars[word[i]] === chars[current]) {
            if (current === "u") {
                maxBeautiful = Math.max(maxBeautiful, i - start + 1);
            }
        } else if (chars[word[i]] === chars[current] + 1) {
            current = word[i];
            if (current === "u") {
                maxBeautiful = Math.max(maxBeautiful, i - start + 1);
            }
        } else {
            start = word[i] === "a" ? i : i + 1;
            current = word[i] === "a" ? "a" : "";
        }
    }
    return maxBeautiful;
}
 */

test("aeiaaioaaaaeiiiiouuuooaauuaeiu", () => {
  const r = longestBeautifulSubstring("aeiaaioaaaaeiiiiouuuooaauuaeiu");
  expect(r).toEqual(13);
});

test("aeeeiiiioooauuuaeiou", () => {
  const r = longestBeautifulSubstring("aeeeiiiioooauuuaeiou");
  expect(r).toEqual(5);
});

test("a", () => {
  const r = longestBeautifulSubstring("a");
  expect(r).toEqual(0);
});

test("auoeioueiaaioeuieuoaieuaoeuoaiaoueioiaeuiuaeouaoie", () => {
  const r = longestBeautifulSubstring(
    "auoeioueiaaioeuieuoaieuaoeuoaiaoueioiaeuiuaeouaoie"
  );
  expect(r).toEqual(0);
});

test("aioeuieuieuoaieu", () => {
  const r = longestBeautifulSubstring("eiaaioeuieui");
  expect(r).toEqual(0);
});

test("aeiouoaieuuoaeiiaoueueoiaiaeuoueaioeuaioiueoaaiueo", () => {
  const r = longestBeautifulSubstring(
    "aeiouoaieuuoaeiiaoueueoiaiaeuoueaioeuaioiueoaaiueo"
  );
  expect(r).toEqual(5);
});
test("aeiouaaeiiou", () => {
  const r = longestBeautifulSubstring("aeiouaaeiiou");
  expect(r).toEqual(7);
});
