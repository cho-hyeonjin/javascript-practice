// 👩🏻‍💻 콜백 함수는 콜백 함수다
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i);
  },
};
obj.logValues(1, 2);
[4, 5, 6].forEach(obj.logValues);
// =========================================================================================================

// 👩🏻‍💻 1) 콜백 함수 내부에서 this에 특정 값을 바인딩하는 방법 1 - 전통적인 방법
//       -> 특정 this값을 변수에 담아 여러 곳에서 재활용하기
var obj1 = {
  name: "obj1",
  func: function () {
    var self = this;
    return function () {
      console.log(
        "self의 name: ",
        self.name,
        "=> self에 obj1을 할당하고 self의 name을 확인해봤어요.",
        "this는 obj1?",
        this === obj1 ? true : false,
        "self는 obj1?",
        self === obj1 ? true : false
      );
      console.log("그럼 여기서 this가 뭐니?", this); // obj1의 func는 전역객체인 Window군!
    };
  },
};

var callback = obj1.func();
setTimeout(callback, 1000);

// == obj1 객체 안에서 func메서드 內에서 self라는 변수를 선언하여 obj1.func메서드의 this객체를 담아줌! =======================
//    👉🏻 self변수로 obj1.func의 this바인딩값인 obj1객체에 접근할 수 있게 됨!
//    ✅ obj1.func의 this를 여러 곳에서 재활용 할 수 있게 된 것!
// ===========================================================================================================

// 👩🏻‍💻 2) 콜백 함수 내부에서 this를 사용하지 않는 경우 - 특정 this값을 재활용할 필요가 없는 케이스라서 1번에서의 작업을 안해준 케이스
//       -> 코드가 간결해지지만 이 뒤에 이어서 작성하는 코드에서 obj1.func메소드의 this를 재활용하는 경우 코드가 복잡해짐
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(obj1.name);
  },
};

setTimeout(obj1.func, 1000);
// 2-1)
var obj2 = {
  name: "obj2",
  func: obj1.func, // obj1의 func를 복사해서 -> obj2.func에 담음
};

var callback2 = obj2.func(); // obj1의 func 실행 결과를 -> callback2에 담음
setTimeout(callback2, 1500);

var obj3 = { name: "obj3" };

var callback3 = obj1.func.call(obj3); // obj1의 func를 실행하면서, 콜백함수로 call메서드를 사용하여 obj3로 명시적 this바인딩
setTimeout(callback3, 2000);

// == 코드 어떠니? 복잡해요😵‍💫 =======================================================================================
// -> 그래서 처음에 조금 복잡해보이더라도 1)에서의 전통적 방법으로 메서드 안에서 변수를 선언하여 자신의 this를 담아주는 방법을 사용했던 것!
// =============================================================================================================

// 👩🏻‍💻 3) 콜백 함수 내부에서 this에 특정 값을 바인딩하는 방법 2 - bind 메서드 활용
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};

setTimeout(obj1.func.bind(obj1), 1000); // obj1.func의 this를 obj1으로 바인딩하는 콜백함수가 1000ms 뒤에 실행됨 -> 1초 뒤 콘솔에 obj1 찍힘

var obj2 = { name: "obj2" };

setTimeout(obj1.func.bind(obj2), 1500); // obj1.func의 this를 obj2로 바인딩하는 콜백함수가 1500ms 뒤에 실행됨 -> 1.5초 뒤 콘솔에 obj2 찍힘

// ==============================================================================================================================

// 👩🏻‍💻 bind 메서드 알아보기
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d); // 여기서의 this는 전역객체
};
func(1, 2, 3, 4); // func에 인수들 전달하면서 실행 -> Window객체 1 2 3 4

var bindFunc1 = func.bind({ x: 1 }); // func에 bind함수로 this지정하여 실행한 결과를 bindFunc1에 할당 -> bindFunc1 = this값 { x: 1 }에 바인딩된 함수
bindFunc1(5, 6, 7, 8); // bindFunc1 인수들 전달하면서 실행 -> { x: 1 } 5 6 7 8

// =======================================================================================================================================
