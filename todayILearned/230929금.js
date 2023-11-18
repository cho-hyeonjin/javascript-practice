// // 콜백 함수 예제 Array.prototype.map

// var newArr = [10, 20, 30].map(function (currentValue, index) {
//   console.log(currentValue, index);
//   return currentValue + 5;
// });

// console.log(newArr);
// // map메서드 알아보기
// Array.prototype.map(callback,[, thisArg])
// //                  calllback 👉🏻 function(currentValue, index, array)
// //                  map 메서드에서 호출하는 콜백함수의 첫번째 인자는 현재값, 두번째 인자는 현재값의 인덱스, 세번째 인자는 자신이 걸려있는 배열
// // map메서드는 자신 앞에 온 배열의 요소 하나하나를 콜백함수에게 전달하며 호출 && 콜백함수의 실행 결과를 모아 새로운 배열을 만듬
// // 따라서, 다시 코드 첫 줄로 넘어가서

// // newArr는
// // [10, 20, 30] 배열의 요소 하나하나를 즉시 실행 함수인 콜백함수의 currentValue, 현재 들어온 값의 index로 전달.
// function (currentValue, index){
//   // 콘설에 그렇게 들어온 currentValue와 index 로그로 찍어주고
//     console.log (currentValue, index)
//   };
//   // currentValue에 5 더한 값을 리턴
//   return currentValue + 5;
// })
// // 그래서 10 + 5, 20 +30, 10 + 30 해서 [15, 25, 35] 라는 배열값을 리턴하고 끝남

// // 제이쿼리에서는 자바스크립트와 달리 콜백함수의 인자 순서가 (index, currVal)순
// // 이 순서로 자바스크립트 map 메서드에 적용하면?
// var newArr2 = [10, 20, 30].map(function (idx, currVal) {
//   console.log(idx, currVal);
//   return currVal + 5;
// });
// console.log(newArr2);
// // 제이쿼리가 어떻든 여기는 자바스크립트 세상!
// // JS의 map메서드는 value, index, array 순으로 인식하기 때문에
// // 위 코드에서 idx는 value로 인식될 것이고, currVal은 index로 인식되지 않을까?
// // 그렇게 되면, currVal에 인덱스가 들어오니까 0, 1, 2. idx는 바퀴당 10, 20, 30을 받을 것 같다.
// // 그럼 currVal + 5는 0+5, 1+5, 2+5 해서 [5, 6, 7]이 나오지 않을까?
// // 콘솔에 찍어서 확인해보자. --> 정답!
// // ==> 메서드가 정의된 부분을 확인한 뒤 위치에 따른 인자 종류 등 사용법을 익혀서 사용해야 한다!
// //     왜?
// //     콜백함수를 지휘하는 주체는 해당 메서드이기 때문.
// // * 메서드든 함수든 콜백함수를 호출 하는 주체가 따른 규칙에 맞게 설정한 콜백 함수를 넘겨줘야 한다.

// CallBack에서의 this
// 바로 앞 절에서 콜백함수에 대해 이해하는 데에 Array.prototype.map 메서드를 이용해서 알아봤다.
// map메서드는
// Array.prototype.map(callback[, thisArg]) 구조이고,
// map메서드의 첫번째 인자인 callback에는 함수가 들어오며 첫번째 인자는 필수값,
// 두번째 인자인 thisArg는 this바인딩값으로 설정해줄 값이 들어오며 이 값은 선택값이라고 했다.
// thisArg에 별도로 값을 전달하지 않는 경우에는 전역객체가 바인딩된다.
// 여기에 이어서 콜백함수에서의 this에 대해 이해하는 시간을 가져보자.

// map메소드 직접 만들어보기!
Array.prototype.map = function (callback, thisArg) {
  var mappedArr = [];
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    //                callback함수의 첫 인자는 value, 두번째 인자는 index, 세번재 인자는 map메소드가 걸려있는 객체임을 직접 구현한 코드
    mappedArr[i] = mappedValue;
    // 새로 만들어지는 배열의 요소에는 콜백함수로 인한 연산이 끝난 값이 들어가도록 수동 구현 해준 것.
  }
  return mappedArr; // 그리고 그렇게 새로 만들어진 배열을 리턴하도록 수동 구현해 준 것.
};
// 왜 map메서드의 thisArg값을 명시해두면 해당 값으로 this값이 명시적 바인딩을 할까에 대해 생각해봤니?
// this바인딩 부분에서 명시적바인딩을 배웠던 기억이 난다.
// mappedValue에서 callback.call 메서드를 쓰고 있다!! call은 명시적 바인딩을 하는 함수인데
// 그 함수의 첫 인자에 thisArg 또는 전역window객체를 넣으라고 적혀있다!
// function(callback, thisArg)에서 callback만 들어오면 call(thisArg || window, )에서 thisArg에 들어올 값이 없으므로 window가 되겠지!

// ? map메서드 구현의 핵심은 call/apply메서드에 있다고 함.
// ? 현재는 this바인딩 부분에서 call과 apply메서드가 this를 명시적으로 바인딩 한다는 컨셉만 알고 있는 상태이므로
// ? call/apply메서드에 대해서도 공부할 것!
