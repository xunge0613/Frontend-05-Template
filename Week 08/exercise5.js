// 用状态机实现：字符串“abcabx”的解析

let state;
function match(str) {
  state = start;
  for (let c of str) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === "a") return foundA;
  return start;
}

function foundA(c) {
  if (c === "b") return foundB;
  return start(c);
}

function foundB(c) {
  if (c === "c") return foundC;
  return start(c);
}

function foundC(c) {
  if (c === "a") return found2A;
  return start;
}

function found2A(c) {
  if (c === "b") return found2B;
  return start(c);
}

function found2B(c) {
  if (c === "x") return end;
  return foundB(c);
}

function end(c) {
  return end;
}

console.log(match("ababcabx"));  // true
console.log(match("abaabc3abx")); // false