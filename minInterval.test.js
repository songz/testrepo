function length(left, right) {
    return right - left + 1;
}

function minInterval(intervals, queries) {
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    const indexedQueries = queries.map((query, index) => ({ query, index })).sort((a, b) => a.query - b.query);
    const heap = new Heap((left, right) => length(right) < length(left));
    const results = queries.map(() => -1);
    let i = 0;
    for (const { query, index } of indexedQueries) {
        while (i < intervals.length && intervals[i][0] <= query) {
            heap.push(intervals[i]);
            i += 1;
        }
        while (heap.length > 0 && heap.top[1] < query) {
            heap.pop();
        }
        if (heap.length > 0) {
            results[index] = length(heap.top);
        }
    }
    return results;
}

function Heap(isRightHigherPriority) {
  const parent = (i) => {
    return Math.floor( (i - 1) / 2 )
  }
  let state = []
  this.push = (e) => {
    state.push(e)
    if (state.length === 1) {
      return
    }

    let i = state.length - 1
    while( i > 0 && isRightHigherPriority(state[parent(i)], state[i])) {
      const parentI = parent(i)
      [state[i], state[parentI]] = [state[parentI], state[i]]
      i = parentI
    }
  }

  this.pop = () => {
    if (!state.length) return null;
    if (state.length === 1) {
      return state.pop()
    }
  }
}

class Heap {

    pop(): T | null {
        if (this.state.length === 0) return null;
        if (this.state.length === 1) return this.state.pop()!;
        const result = this.state[0];
        this.state[0] = this.state[this.state.length - 1];
        this.state.pop();
        let i = 0;
        while (
            (leftChild(i) < this.state.length &&
                this.isRightHigherPriority(this.state[i], this.state[leftChild(i)])) ||
            (rightChild(i) < this.state.length &&
                this.isRightHigherPriority(this.state[i], this.state[rightChild(i)]))
        ) {
            if (
                rightChild(i) < this.state.length &&
                this.isRightHigherPriority(this.state[i], this.state[rightChild(i)]) &&
                this.isRightHigherPriority(this.state[leftChild(i)], this.state[rightChild(i)])
            ) {
                [this.state[i], this.state[rightChild(i)]] = [
                    this.state[rightChild(i)],
                    this.state[i],
                ];
                i = rightChild(i);
            } else {
                [this.state[i], this.state[leftChild(i)]] = [
                    this.state[leftChild(i)],
                    this.state[i],
                ];
                i = leftChild(i);
            }
        }
        return result;
        function leftChild(i: number): number {
            return i * 2 + 1;
        }
        function rightChild(i: number): number {
            return leftChild(i) + 1;
        }
    }

    get length(): number {
        return this.state.length;
    }
    
    get top(): T {
        return this.state[0];
    }
}

test("[[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", () => {
  const r = minInterval(
    [
      [1, 4],
      [2, 4],
      [3, 6],
      [4, 4],
    ],
    [2, 3, 4, 5]
  );
  expect(r).toEqual([3, 3, 1, 4]);
});

test("[[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]", () => {
  const r = minInterval(
    [
      [2, 3],
      [2, 5],
      [1, 8],
      [20, 25],
    ],
    [2, 19, 5, 22]
  );
  expect(r).toEqual([2, -1, 4, 6]);

