// 예제 2-6 함수 선언의 호이스팅(2) - 호이스팅을 마친 상태

function a() {
  var b; // 수집 대상 1. 변수는 선언부만 끌어올립니다.
  function b() {} // 수집 대상 2. 함수 선언은 전체를 끌어올립니다.

  console.log(b); // (1)
  b = "bbb"; // 변수의 할당부는 원래 자리에 남겨둡니다.
  console.log(b); // (2)
  console.log(b); // (3)
}
a();
