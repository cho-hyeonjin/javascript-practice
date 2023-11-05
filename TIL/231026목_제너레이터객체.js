// * 제너레이터 함수를 호출하면 일반 함수처럼 함수 코드블록을 실행하는 것이 아니라)
// * 제너레이터 객체를 생성해 반환한다.
//
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수 호출 시 제너레이터 객체 반환
const generator = genFunc();
// * 제너레이터 객체는 이터러블이면서 동시에 이터레이터이다.
// * 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iteratir in generator); // true
// * 이터레이터는 next 메서드를 갖는다.
console.log("next" in generator); // true
