// * constructor vs prototype vs __proto__
// > class 몸체에는 0개 이상의 메서드만 선언할 수 있다.
//// 클래스 란?
// > class 바디에서 정의할 수 있는 메서드는 3가지
//// 메서드 란?
// > ① constructor(생성자) --- constructor는 메서드로 해석되지 X 클래스가 평가되어 생성한 함수객체 코드의 일부가 됨.
// > ② prototype method(프로토타입 메서드)
// > ③ static method(정적 메서드)
// * constructor
// * 생성자함수
// > 생성자 constructor 예제 코드
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}
console.log(typeof Person); // function
console.dir(Person); // class Person
// > 클래스는 인스턴스를 생성하기 위한 생성자 함수이다.
// > ∴ class는 function이다.
// >   클래스는 평가되어 함수 객체가 된다.
// >   ∴ 클래스도 함수 객체 고유의 프로퍼티를 모두 가지고 있다.
// >     함수와 동일하게 프로토타입과 연결되어 있으며, 자신의 스코프체인을 구성한다. //// 18.2절 함수 객체의 프로퍼티
// > class로 인스턴스 생성 예제코드
const me = new Person("Cho");
console.log(me); // Person {name: 'Cho'}

// * prototype
// * 자바스크립트가 함수에 자동으로 생성해두는 프로퍼티로, 객체임.
// * __proto__
// * new키워드로 생성자함수를 호출하여 생성된 인스턴스에 자동으로 생성되는 객체 프로퍼티로, prototype과 마찬가지로 객체임. __proto__는 자신을 생성한 생성자 함수의 prototype프로퍼티를 참조한다.
