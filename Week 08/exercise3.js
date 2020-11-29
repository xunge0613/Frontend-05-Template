// 不准使用正则表达式，纯粹用 JavaScript 的逻辑实现：在一个字符串中，找到字符“abcdef”

function findABCDEF(str, target) {
  
  // 构建 status 和 target 
  let currentIndex = 0; // 当前匹配状态
  const status = {}; // 匹配成功状态
  const targetStr = {};  // 待匹配字符串
  for (let index = 0; index < target.length; index++) {
    status[index] = false;
    targetStr[index] = target[index];
  }
 
  for (const s of str) {
    if(s === targetStr[currentIndex]) {
       // 找到当前状态匹配字段，索引+1，去匹配下一个字符串
      currentIndex++;
      if(currentIndex === target.length) {
        // 最后一位也匹配成功
        return true;
      }
    } else {
      // 匹配失败，返回初始状态或第一个字符（可优化为匹配成功的子串）
      currentIndex = (s === targetStr[0] ? 1 : 0);
    }
  }
  return false;
}

console.log(findABCDEF("abcdefg", "abcdef")); // true
console.log(findABCDEF("abcabcdefg", "abcdef")); // true
console.log(findABCDEF("abcdedf", "abcdef")); // false
console.log(findABCDEF("aab", "abcdef")); // false