// 함수 선언식 - function 정의부만 존재
function declaration() {
  console.log("function declaration is 함수 선언식");
}

// 함수 표현식 中 익명 함수 표현식
var anonymous = function () {
  console.log("나는 익명 함수 표현식");
}; // anonymous가 곧 함수명이 됨
anonymous(); // "나는 익명 함수 표현식"

// 함수 표현식 中 기명 함수 표현식
var register = function a() {
  console.log("나는 기명 함수 표현식. 내 이름은 a.");
}; // a가 함수명, register은 변수명. 변수명으로 함수 호출 불가능.
register(); // 에러
a(); // "나는 기명 함수 표현식. 내 이름은 a."
