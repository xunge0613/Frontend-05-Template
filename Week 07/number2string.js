 function number2string(num, base) {
  if (num === 0) return '0';
  if (base === 10) return String(num);

  let str = '';
  let number = Math.abs(num);
  let sign = num > 0 ? '' : '-';

  const table = [
      '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'
  ]

  while (number > 0) {
    str = table[number % base] + str;

    number = parseInt(String(number / base));
  }

  return sign + str;
}
