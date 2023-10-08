// constructor vs prototype vs __proto__
// > class 몸체에는 0개 이상의 메서드만 선언할 수 있다.
//// 클래스 란?
// > class 바디에서 정의할 수 있는 메서드는 3가지
//// 메서드 란?
// > ① constructor(생성자) method
// > ② prototype method(프로토타입 메서드)
// > ③ static method(정적 메서드)
// * constructor
// * -> 정의 : 인스턴스를 생성 & 초기화하는 특수 메서드
// * -> 특징: 메서드명 변경 불가능
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
