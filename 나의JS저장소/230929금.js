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

// 제이쿼리에서는 자바스크립트와 달리 콜백함수의 인자 순서가 (index, currVal)순
// 이 순서로 자바스크립트 map 메서드에 적용하면?
var newArr2 = [10, 20, 30].map(function (idx, currVal) {
  console.log(idx, currVal);
  return currVal + 5;
});
console.log(newArr2);
// 제이쿼리가 어떻든 여기는 자바스크립트 세상!
// JS의 map메서드는 value, index, array 순으로 인식하기 때문에
// 위 코드에서 idx는 value로 인식될 것이고, currVal은 index로 인식되지 않을까?
// 그렇게 되면, currVal에 인덱스가 들어오니까 0, 1, 2. idx는 바퀴당 10, 20, 30을 받을 것 같다.
// 그럼 currVal + 5는 0+5, 1+5, 2+5 해서 [5, 6, 7]이 나오지 않을까?
// 콘솔에 찍어서 확인해보자. --> 정답!
// ==> 메서드가 정의된 부분을 확인한 뒤 위치에 따른 인자 종류 등 사용법을 익혀서 사용해야 한다!
//     왜?
//     콜백함수를 지휘하는 주체는 해당 메서드이기 때문.
// * 메서드든 함수든 콜백함수를 호출 하는 주체가 따른 규칙에 맞게 설정한 콜백 함수를 넘겨줘야 한다.