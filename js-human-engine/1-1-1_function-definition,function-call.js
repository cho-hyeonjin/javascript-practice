// * 함수 정의 (변수 선언, 화살표 함수 표현식)
const add = (a, b) => a + b;
// const add = (a, b) => { return a + b; } 랑 같은 코드인거 알지?
// const add = (a, b) => { a + b; } 랑도 같은 코드고~
// 참고로 만약 객체를 리턴해야 한다면, 반드시 ()로 묶어줘야 하는 것도 알지~? --> const add = (a, b) => ({ a , b }) 이런 느낌으로!
// ()로 안 감싸주면 { a + b } 를 실행문으로 인식할테니까~

// * 함수 정의 (함수 선언문)
function calculator(func, a, b) {
  return func(a, b);
}

// * 함수 호출
add(3, 5); // 8을 리턴하겠네
