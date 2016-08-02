function calc(str) {

  str = str.trim();

  if (noRepeats(str) && correctStart(str)) {
    return add(str);
  } else {
    return str;
  }

}

// the string is only allowed to start with
// a '-/+' or a num; returns t/f 
// true if it passes false if it fails
function correctStart(str) {
  return /^[\d | \- | +]/.test(str);
}

// checks to see if the string has repeat operations
// true if it passes false if it fails
function noRepeats(str) {

  var regex = /[+ | * | \- | \/]+/g;
  var ex = regex.exec(str);
  var operations = []; // keep track of the +/- etc
  var pass = true; // flag to check for repeats

  // collect the operations in order to check them
  while (Boolean(ex)) {
    operations.push(ex[0]);
    ex = regex.exec(str);
  }

  // check for repeats in the array
  for (var i in operations) {
    if (operations[i].length > 1) {
      console.log("error");
      pass = false;
      break;
    }
  }

  return pass;
}

// stage 1
function add(str) {

  str = str.split('+');

  // it is possible that the first char is '+'
  // must create an exception rule for it
  if (str[0] === '') {
    str.shift();
  }

  for (var i in str) {
    str[i] = sub(str[i]);
  }

  var total = str[0];

  for (var i = 1; i < str.length; i++) {
    total += str[i];
  }

  return total;
}

// stage 2
function sub(str) {

  str = str.split('-');

  // it is possible that the first char is '-'
  // must create an exception rule for it
  if (str[0] === '') {
    str.shift();
    str[0] = '-' + str[0];
  }

  for (var i in str) {
    str[i] = mult(str[i]);
  }

  var total = str[0];

  for (var i = 1; i < str.length; i++) {
    total -= str[i];
  }

  return total;
}

// // stage 3; WORKING ON THIS ONE
// function mod(str) {

// 	str = str.split('*');
// 	total = 1;

// 	for (var i in str) {
// 		total *= parseFloat(div(str[i]));
// 	}

// 	return total;
// }

// stage 4
function mult(str) {

  str = str.split('*');
  total = 1;

  for (var i in str) {
    total *= parseFloat(div(str[i]));
  }

  return total;
}

// stage 5; this is the root base case
function div(str) {

  str = str.split('/');

  var total = parseFloat(str[0]);

  for (var i = 1; i < str.length; i++) {
    total /= parseFloat(str[i]);
  }

  return total;
}

// console.log(calc('333.666+1*6*2+22+2-555*22/2/22+2*1-1'));
// console.log(calc('2+2'));