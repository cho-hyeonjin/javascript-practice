// 예제 1-22 undefined와 null의 비교

var n = null;
console.log(typeof n); // object

console.log(n == undefined); // true
console.log(n == null); // true

console.log(n === undefined); // false
console.log(n === null); // true
