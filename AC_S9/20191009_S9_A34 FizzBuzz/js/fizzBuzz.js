function fizzBuzz (num) {
  let str = ''
  if (num % 3 === 0) {
    str += 'Fizz';
  }
  if (num % 5 === 0) {
    str += 'Buzz';
  }
  console.log(str);
  if (str != '') {
    return str;
  } else {
    return num;
  }
}