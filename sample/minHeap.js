function Heap(isRightHigherPriority) {
  const parent = (i) => {
    return Math.floor((i - 1) / 2);
  };
  const leftChild = (i) => {
    return i * 2 + 1;
  };
  const rightChild = (i) => {
    return leftChild(i) + 1;
  };
  let state = [];
  this.push = (e) => {
    state.push(e);
    if (state.length === 1) {
      return;
    }

    let i = state.length - 1;
    while (i > 0 && isRightHigherPriority(state[parent(i)], state[i])) {
      const parentI = parent(i);
      [state[i], state[parentI]] = [state[parentI], state[i]];
      i = parentI;
    }
  };

  this.pop = () => {
    if (!state.length) return null;
    if (state.length === 1) {
      return state.pop();
    }
    const result = state[0];
    state[0] = state[state.length - 1];
    state.pop();

    let i = 0;
    while (
      (leftChild(i) < state.length &&
        isRightHigherPriority(state[i], state[leftChild(i)])) ||
      (rightChild(i) < state.length &&
        isRightHigherPriority(state[i], state[rightChild(i)]))
    ) {
      const ri = rightChild(i);
      const rc = state[ri];

      const li = leftChild(i);
      const lc = state[li];
      if (
        ri < state.length &&
        isRightHigherPriority(state[i], rc) &&
        isRightHigherPriority(lc, rc)
      ) {
        [state[i], state[ri]] = [state[ri], state[i]];
        i = ri;
      } else {
        [state[i], state[li]] = [state[li], state[i]];
        i = li;
      }
    }
    return result;
  };

  this.length = () => {
    return state.length;
  };
  this.top = () => {
    return state[0];
  };
}
