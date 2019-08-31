const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

var str = '';
for (i = 0; i < rainbow.length; i++) {
  str += rainbow[i];

  if(i != rainbow.length -1)
    str += ", ";
}

console.log(str);

console.log(rainbow.join(' ,'))