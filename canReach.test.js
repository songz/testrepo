const canReach = function (s, min, max) {
  const queue = [0];

  let lastVisited = 0;
  while (queue.length) {
    const idx = queue.shift(); // omg shift is so important wasted a few hours cuz I used pop

    const start = Math.max(min + idx, lastVisited); // I didn't understand why this is necessory, explanation below
    const end = Math.min(idx + max, s.length);
    for (let i = start; i <= end; i++) {
      if (i === s.length - 1) {
        return s[i] === "0";
      }

      if (s[i] === "0") {
        queue.push(i);
      }
    }
    lastVisited = idx + max;
  }

  console.log(`length ${s.length}`);
  return false;
};

/* Why
 * start = Math.max(min+idx, lastVisited)
 *
 * Example: (input string doesn't matter, its a queue thing), min=2, max=8
 *
 * Queue starts at [0]
 * Then queue becomes [2,3,4,5,6,7,8,9]
 * On the 2nd iteration, Do you really wanna start from 2+min?
 *   Because you'll be going through 3,4,5,6,8,9 again (which you have done previously).
 *
 * Instead, you should start where you left off previously (9)
 *
 * So then you only do 2 iterations and add [9,10] to the queue
 */

test("011010, 2, 3", () => {
  const result = canReach("011010", 2, 3);
  expect(result).toEqual(true);
});

test("01101110", () => {
  const result = canReach("01101110", 2, 3);
  expect(result).toEqual(false);
});

test("01101110", () => {
  const result = canReach("01101110", 2, 3);
  expect(result).toEqual(false);
});

test("0000000000000000000000000000000000", () => {
  const result = canReach("0000000000000000000000000000000000", 5, 15);
  expect(result).toEqual(true);
});

test("0000000000", () => {
  const result = canReach("0000000000", 2, 4);
  expect(result).toEqual(true);
});
