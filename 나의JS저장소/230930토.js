// // CallBack함수는 '함수'다

// var obj = {
//   vals: [1, 2, 3],
//   logValues: function (v, i) {
//     // 객체의 요소값으로 할당된 함수이므로, '메서드' 이다.
//     console.log(this, v, i);
//   },
// };

// obj.logValues(1, 2); // logValues메서드의 인자로 1, 2를 전달하며 호출하고 있다. --> 메서드로 호출
// // console.log(this, v, i) 출력 결과는
// // obj의 메서드로써 호출되었기 때문에(앞에.이 있으면 .앞의 객체에 속한 메서드로 호출된 것)
// // logValues의 this는 obj이다.

// [4, 5, 6].forEach(obj.logValues); // 하지만 이 코드에서는 forEach메서드의 콜백함수로 obje.lobValues가 호출되었다.
// // Array.prototype.forEach(callback함수,[, thisArg])
// // 메서드의 콜백함수로 메서드가 쓰인 것!
// // 이럴 땐 obj.logValues키가 가리키는 함수만 전달한 것이다.
// // 무슨 말이냐면, obj의 logValues로서 this바인딩값까지 전달하는 것이 아니라
// // logValues가 참조하고 있는 참조값에 해당하는 함수. 그 함수만 전달한다는 뜻이다.
// //
// // forEach에 의해 obj.logValues만 인자로 전달되어 호출되었고,
// // 그 뒤의 thisArg가 지정되지 않았기 때문에 이 함수의 this는 전역객체가 들어오게 됨

// CallBack함수 내부의 this에 다른 값 Binding하기
// thisArg가 있어서 this를 명시적으로 바인딩 할 수 없는 메서드 또는 함수라면 이 this는 해당함수가 호출된 시점에 따라 동적으로 바인딩되고
// 콜백함수는 다른 함수에 의해 호출될 때 자기 자신의 제어권 뿐만 아니라 자신의 this 제어권 또한 넘여주게 됨.
// 따라서 이런 코드에서 this를 명시적으로 설정하고 싶을 때에는,
// this로 설정하고 싶은 객체를 별도의 변수에 담아서 그 변수를 클로저로 만들어 this 대신 접근하는 방식을 사용하는 게 전통적인 방법이었다.
var obj1 = {
  name: "obj1",
  func: function () {
    var self = this;
    return function () {
      console.log(self.name);
    };
  },
};
var callback = obj1.func();
setTimeout(callback, 1000);
// 이런 방식.
// 근데 굳이 self변수에 obj1에 바인딩 된 this를 할당하지 않아도 아래처럼 호출해도 같은 결과를 낼 수 있는데 굳이 사용해야 하나 싶을 것 같기도 하다.
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(obj1.name);
  },
};
setTimeout(obj1.func, 1000);
// 위 코드가 더 간결하고 직관적이지만 앞서 self에 obj1이 바인딩된 this를 담아서 해당 변수를 사용하는 방식보다 아쉬운 점이 있다면
// obj1이 바인딩된 this를
// 다양한 상황에서 재활용 할 수는 없다는 점이다.
