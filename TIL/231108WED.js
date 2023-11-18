// 함수 선언문
function addFunc(x) {
  return x + 1;
}

// 함수 표현식
const addFuncExpressionVer = function (x) {
  return x + 1;
};

// 함수 표현식 축약 + 진화 ver. --> 화살표 함수
const addFuncArrowVer = (x) => {
  return x + 1;
};

// 화살표 함수 축약 ver.
const addFuncArrowShortenVer = (x) => x + 1;

// Function()으로 찍어내기
// Function 명세서 : 1. Function() 기능을 아래와 같이 사용하면 당신이 원하는 함수를 만들 수 있습니다.
//                 2. 당신이 원하는 함수명을 변수로 선언해 보세요.
//                 3. 1번에서 찍어낸 함수를 2번의 변수에 할당해보세요.
//                 4. 축하합니다. 이제 당신이 원하는 함수명으로 당신이 만든 함수를 호출할 수 있게 됐습니다.
new Function("인자1", "인자2", ..."인자N", "함수몸체내용"); // 오..ㅇㅋㅇㅋ
// 명세 따라 만들기
const squareFunc = new Function("arg1", "arg2", "return arg1 * arg2");
// 잘 만들어졌는지 사용 테스트
console.log(squareFunc(2, 3)); // 6

var primitive;

primitive = "primitive";

var object = {
  a: 1,
  b: "str",
};
