// 콜백 함수 예제 Array.prototype.map

var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
});

console.log(newArr);
// map메서드 알아보기
Array.prototype.map(callback,[, thisArg])
//                  calllback 👉🏻 function(currentValue, index, array)
//                  map 메서드에서 호출하는 콜백함수의 첫번째 인자는 현재값, 두번째 인자는 현재값의 인덱스, 세번째 인자는 자신이 걸려있는 배열
// map메서드는 자신 앞에 온 배열의 요소 하나하나를 콜백함수에게 전달하며 호출 && 콜백함수의 실행 결과를 모아 새로운 배열을 만듬
// 따라서, 다시 코드 첫 줄로 넘어가서

// newArr는
// [10, 20, 30] 배열의 요소 하나하나를 즉시 실행 함수인 콜백함수의 currentValue, 현재 들어온 값의 index로 전달.
function (currentValue, index){
  // 콘설에 그렇게 들어온 currentValue와 index 로그로 찍어주고
    console.log (currentValue, index)
  };
  // currentValue에 5 더한 값을 리턴
  return currentValue + 5;
})
// 그래서 10 + 5, 20 +30, 10 + 30 해서 [15, 25, 35] 라는 배열값을 리턴하고 끝남