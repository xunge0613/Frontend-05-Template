function findA(str, target) {
  for (const s of str) {
    if(s === target) {
      return true;
    }
  }
  return false;
}

console.log(findA("acb", "a")); // true
console.log(findA("cb", "a")); // false