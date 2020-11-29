// 不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“ab”


function findAB(str, target) {
  const [targetA, targetB] = target;
  let hasFoundA = false;
  for (const s of str) {
    // 已经找到 a
    if(hasFoundA) {
      switch (s) {
        case targetB:
          // 找到 ab
          return true;
          break;
        case targetA:
          // aa
          break;
        default:
          // ac 重新开始
          hasFoundA = false;
          break;
      }
    } else {
      // 还未找到 a
      if(s === targetA) {
        hasFoundA = true;
      } 
    }
    
  }
  return false;
}

console.log(findAB("abc", "ab")); // true
console.log(findAB("cb", "ab")); // false
console.log(findAB("aab", "ab")); // true