function stringToNumber(str){
  function changeFormat(val){
    let formatList = '0123456789ABCDEF'
    return formatList.indexOf(val)
  }
  // 符号位
  let sign = '';
  if(str[0] === '-'){
    sign = '-'
    str = str.substr(1)
  }
  let radix = null;
  switch (str.substr(0,2)) {
    case '0b':
      radix = 2
      break;
    case '0o':
      radix = 8
      break;
    case '0x':
      radix = 16;
      break
  }
  if(!radix){
    return Number(`${sign}${str}`)
  }
  // 去除0b 0o 0x
  str = str.substr(2)
  let fixedIndex = str.indexOf('.')
  let fixed,intger
  if(fixedIndex !== -1){
    fixed = str.substr(fixedIndex+1)
    intger = str.substr(0,fixedIndex)
  }else{
    intger = str
  }
  let num = 0;
  // 处理整数部分
  for(let i = 0; i < intger.length; i++){
    num += Number(changeFormat(intger[i])) * radix ** (intger.length - 1 - i)
  }
  // 处理小数部分
  if(fixed){
   for(let i = 0; i < fixed.length; i++){
     num += Number(changeFormat(fixed[i])) * radix ** -(i+1)
   }
  }
  return Number(`${sign}${num}`)
}

console.log(stringToNumber('0b0'))
console.log(stringToNumber('-0b110'))
console.log(stringToNumber('0xFE')) 
console.log(stringToNumber('0xFE.5374BC6A7EF8'))
console.log(stringToNumber('-0b1010'))
console.log(stringToNumber('-0b11111111'))