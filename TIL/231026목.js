// ** 제네레이터 함수 정의 방법

// * 제네레이터 함수 선언문
function* genDecFunc() {
  yield;
}

// * 제네레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// * 제네레이터 메서드
const obj = {
  *genObjMethod() {
    yield 1;
  },
};

// * 제네레이터 클래스 메서드
class MyClass {
  *genClsMethod() {
    yield 1;
  }
}

// ! 제너레이터 함수는 Arrow function ❌
const genArrowFunc = * () => {
  yield 1;
}
// ---> 불가!!
// ! 제너레이터 함수는 new 연산자와 함께 생성자로 호출할 수도 ❌
function * genFunc() {
  yield 1;
}

new genFunc();
// ---> 불가!!

// ** asterisk의 위치는 function 키워드와 함수명 사이 어디든 상관은 없으나, 일관성을 유지하자. 책에서는 function 키워드 바로 뒤에 붙이는 것을 권장.
// 또한 오늘 우테코 피드백에서 '띄어쓰기 또한 컨벤션'이라 한 만큼 일관성을 유지하는 게 좋을 듯 하다.
function* genFunc() { yield 1; } // 권장
function * genFunc() { yield 1; }
function *genFunc() { yield 1; }
function*genFunc() { yield 1; }