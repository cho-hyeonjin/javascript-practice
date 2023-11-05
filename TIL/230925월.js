// 프로토타입 도식 이해하기

var instance = new Constructor();

// 생성자함수와 instance, 그리고 instance를 이용한 __proto__의  예시

var Person = function (name) {
  this._name = name;
};

Person.prototype.getName = function () {
  return this._name;
};

var suzi = new Person("Suzi");

suzi.__proto__.getName(); // undefined 뜸. 왜? 이건 suzi의 dunder proto(생성자의 prorotype프로퍼티 참조하여 자동생성된 객체) 프로퍼티의 이름을 가져오라는 코드.

// 하지만 위에서 생성자함수의 인자로 던진 "Suzi"는 생성자에 Suzi를 던지면서 생성됐을 뿐.

// 어떤 함수를 '메서드'로 호출 시, 그 메서드명 바로 앞의 갹채가 this.

// 즉, 위에서 Person 생성자 함수가 생성할 인스턴스의 _name프로퍼티로 매개변수에 들어온 name값을 매칭해주라고 했고,

// 이는 suzi 인스턴스의 _name  프로퍼티에 "Suzi"가 매칭될 것임을 알 수 있게 한다.

// 하지만, suzi 인스턴스의 __proto__객체에는 어떤 값도 매칭되지 않았기 때문에,

// suzi.__proto__.getName()  실행 시, undefined가 뜨는 것이다.

suzi._name; // "Suzi"

// suzi._name 실행 시, "Suzi"가 찍힌다.

// suzi.__proto__.getName() 실행 시 값이 나오게 하고 싶다면 아래와 같이 작성한다.

suzi.__proto__.name = "Suzi__proto__";
suzi.__proto__.getName(); // "Suzi__proto__"
