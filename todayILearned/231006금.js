// * Function.prototype.call(thisArg[, arg1, [,arg2[, ...]]])
// * call메서드는 자신의 호출 주체 함수를 즉시 실행하도록 하는 명령.
// * 메서드의 첫번째 인자를 this로 바인딩하고 나머지 인자들은 호출할 함수의 매개변수로 전달.

// call메서드 (1) - call메서드를 호출한 주체가 일반함수인 경우
var func = function (a, b, c) {
  console.log(this, a, b, c);
}; // --- 함수 func

func(1, 2, 3); // 내 예상: f func() {} 1 2 3
//                  정답: Window{...} 1 2 3
func.call({ x: 1 }, 4, 5, 6); // 내 예상: { x: 1 } 4 5 6
//                               정답: { x: 1 } 4 5 6

// * 객체의 메서드를 그냥 호출하면 this는 자신을 호출한 객체에 바인딩되지만,
// * call메서드로 호출하면 this를 특정객체로 지정하여 바인딩 할 수 있다.

// call메서드 (2) - call메서드를 호출한 주체가 (일반함수가 아닌) 메서드인 케이스
var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  }, // --- obj의 메서드 method
};

obj.method(2, 3); // 내 예상: 1 2 3
//                     정답: 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 내 예상: { a: 4 } 5 6
//                                    정답: 4 5 6

// * Function.prototype.apply(thisArg[, argsArray])
// * apply메서드는 call메서드와 기능적으로는 완전 동일하지만 첫 인자 다름인자를 다루는 방식이 약간 다른 메서드.
// * apply메서드는 첫 인자는 call메서드와 같이 this에 바인딩. 두번째 인자는 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정
// * call메서드는 두번째 인자부터 뒷 인자들을 호출할 함수의 매개변수로 지정

// apply메서드
// (1)일반함수가 호출주체인 케이스
var func = function (a, b, c) {
  console.log(this, a, b, c);
};
func.apply({ x: 1 }, [4, 5, 6]); // 내 예상: {x: 1} 4 5 6
//                                  정답: {x: 1} 4 5 6
// (2)메서드가 호출주체인 케이스
var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};
obj.method.apply({ a: 4 }, [5, 6]); // 내 예상: 4 5 6
//                                     정답: 4 5 6
//
//
//
// call / apply 메서드의 활용 - (1) 유사배열객체(array-like object)에 배열 메서드를 적용
// * 유사배열객체(array-like object)?
// * 키가 0 또는 양의 정수인 프로퍼티가 존재하고, length프로퍼티 값이 0 또는 양의 정수인 객체. 즉 구조가 배열과 유사한 객체.
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
}; // --- 유사배열객체 obj
Array.prototype.push.call(obj, "d"); // --- Array메서드인 push에 call메서드를 이용, 첫 인자로 유사배열객체 obj를 this바인딩하고, 'd'를 매개변수로 전달
console.log(obj); // 내 예상: { 0: "a", 1: "b", 2: "c", length: 3, 4: "d" } ..?
//                     정답: { 0: "a", 1: "b", 2: "c", 3:"d", length: 4 }

var arr = Array.prototyep.slice.call(obj); // --- slice메서드는 시작idx, 마지막idx를 매개변수로 받아 시작idx에 해당하는 요소부터 마지막idx 전 요소까지 잘라내 배열로 만드는 (얕은복사)메서드. 매개변수를 따로 전달하지 않을 경우 전체 배열을 얕은복사하여 리턴.
console.log(arr); // --- [ "a", "b", "c", "d" ] // 유사배열객체obj를 배열메서드slice가 호출한 call메서드의 첫번째 인자로 전달, 배열로 전환되어 리턴.

// call / apply 메서드의 활용 - (2) arguments.NodeList에 배열 메서드를 적용
function a() {
  var argv = Array.prototype.slice.call(arguments);
  argv.forEach(function (arg) {
    console.log(arg);
  });
}
a(1, 2, 3); // 내 예상: 1
//                    2
//                    3
//               정답: 1
//                    2
//                    3

document.body.innerHTML = "<div>a</div><div>b</div><div>c</div>";
var nodeList = document.querySelectorAll("div"); // --- 노드리스트 생성
var nodeArr = Array.prototype.slice.call(nodeList); // --- nodeList는 Array와는 다른 자료형임. 유사배열객체를 배열로 변환하는 방식과 같은 방식으로 노드리스트를 배열로 변환
nodeArr.forEach(function (node) {
  console.log(node, typeof node); // --- <div>a</div> 'object'
  //                                     <div>b</div> 'object'
  //                                     <div>c</div> 'object'
});

// call / apply 메서드의 활용 - (3) 문자열에 배열 메서드 적용
var str = "abc def";

Array.prototype.push.call(str, ", pushed string"); // --- Error: Cannot assign to read only property 'length' of object [object String]
//                                                               읽기 전용 프로퍼티인 [object String]객체의 'length'에는 할당할 수 없다.
//                                                               -> String타입도 배열처럼 index와 length프로퍼티를 가지지만,
//                                                                  length프로퍼티가 배열과 다르게 '읽기전용'이여서
//                                                                  push, pop, shift, unshift, splice 등의 원본데이터를 변경하는 메서드 사용 시 위 에러를 던짐.
Array.prototype.concat.call(str, "string"); // --- [String {"abc def"}, "string"] // 에러는 안 나도 concat메서드는 대상이 반드시 배열이어야 하기 때문에 원하는 결과가 아닌 결과가 나옴.
Array.prototype.every.call(str, function (char) {
  return char !== " ";
}); // --- false // all the members of an array satisfy the specified test
//               //   배열 내 모든 요소가 지정된 테스트를 통과해야 true
Array.prototype.some.call(str, function (char) {
  return char === " ";
}); // --- true // ~ returns true for any element of an array
//              //   배열 내 한 개라도 지정된 테스트를 통과하면 true
var newArr = Array.prototype.map.call(str, function (char) {
  return char + "!";
});
console.log(newArr); // --- ['a!', 'b!', 'c!', 'd!', 'e!', 'f!']
var newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) {
    return string + char + i;
  },
  "",
]);
console.log(newStr); // --- "a0b1c2 3d4e5f6"
// * call/apply메서드를 이용해 유사배열객체든 문자열이든 배열로 형변환을 하는 것은 call/apply메서드의 본 사용법은 아님.
// * 이러한 목적이라면 call/apply메서드를 배열메서드와 조합하여 사용하는 방식이 아닌
// * ES6에서 추가된 Array.from메서드를 사용하는 것이 더 바람직.
// call / apply 메서드의 활용 - (4) Array.from메서드
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
var arr = Array.from(obj);
console.log(arr); // ['a', 'b', 'c']
