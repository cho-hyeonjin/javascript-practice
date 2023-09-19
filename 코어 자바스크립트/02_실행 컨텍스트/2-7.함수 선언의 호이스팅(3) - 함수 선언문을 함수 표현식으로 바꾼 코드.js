// 예제 2-7 함수 선언의 호이스팅(3) - 함수 선언문을 함수 표현식으로 바꾼 코드

function a() {
  var b;
  var b = function b() {}; // ← 바뀐 부분

  console.log(b); // (1)
  b = "bbb";
  console.log(b); // (2)
  console.log(b); // (3)
}
a();
