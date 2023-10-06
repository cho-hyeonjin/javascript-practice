// * Function.prototype.call(thisArg[, arg1, [,arg2[, ...]]])
// * call메서드는 자신의 호출 주체 함수를 즉시 실행하도록 하는 명령.
// * 메서드의 첫번째 인자를 this로 바인딩하고 나머지 인자들은 호출할 함수의 매개변수로 전달.

// call메서드 (1) - call메서드를 호출한 주체가 일반함수인 경우
var func = function (a, b, c) {
  console.log(this, a, b, c);
}; // --- 함수 func

func(1, 2, 3); // 내 예상: f func() {} 1 2 3
//                  정답: Window{...} 1 2 3
func.call({ x: 1 }, 4, 5, 6); // 내 예상: { x: 1 } 4 5 6
//                               정답: { x: 1 } 4 5 6

// * 객체의 메서드를 그냥 호출하면 this는 자신을 호출한 객체에 바인딩되지만,
// * call메서드로 호출하면 this를 특정객체로 지정하여 바인딩 할 수 있다.

// call메서드 (2) - call메서드를 호출한 주체가 (일반함수가 아닌) 메서드인 케이스
var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  }, // --- obj의 메서드 method
};

obj.method(2, 3); // 내 예상: 1 2 3
//                     정답: 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 내 예상: { a: 4 } 5 6
//                                    정답: 4 5 6
