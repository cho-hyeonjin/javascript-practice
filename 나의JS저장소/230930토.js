// CallBack함수는 '함수'다

var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    // 객체의 요소값으로 할당된 함수이므로, '메서드' 이다.
    console.log(this, v, i);
  },
};

obj.logValues(1, 2); // logValues메서드의 인자로 1, 2를 전달하며 호출하고 있다. --> 메서드로 호출
// console.log(this, v, i) 출력 결과는
// obj의 메서드로써 호출되었기 때문에(앞에.이 있으면 .앞의 객체에 속한 메서드로 호출된 것)
// logValues의 this는 obj이다.

[4, 5, 6].forEach(obj.logValues); // 하지만 이 코드에서는 forEach메서드의 콜백함수로 obje.lobValues가 호출되었다.
// Array.prototype.forEach(callback함수,[, thisArg])
// 메서드의 콜백함수로 메서드가 쓰인 것!
// 이럴 땐 obj.logValues키가 가리키는 함수만 전달한 것이다.
// 무슨 말이냐면, obj의 logValues로서 this바인딩값까지 전달하는 것이 아니라
// logValues가 참조하고 있는 참조값에 해당하는 함수. 그 함수만 전달한다는 뜻이다.
//
// forEach에 의해 obj.logValues만 인자로 전달되어 호출되었고,
// 그 뒤의 thisArg가 지정되지 않았기 때문에 이 함수의 this는 전역객체가 들어오게 됨
