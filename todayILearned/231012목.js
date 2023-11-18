class Character {
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Character {}
    console.log(
      "Object.getPrototypeOf(this)결과: ",
      Object.getPrototypeOf(this)
    );
    console.log("Character.prototype 결과: ", Character.prototype);
    console.log(
      "위 두개가 같은 객체니?: ",
      Object.getPrototypeOf(this) === Character.prototype
    );
  }
}

console.dir(Character);

// new Character("둘리");

// // * 인스턴스 프로퍼티는 클래스의 constructor 내부에서 this에 추가해야 한다.
// class Person {
//   constructor(name) {
//     // 인스턴스 프로퍼티
//     this.name = name; // name 프로퍼티는 public이다.
//   }
// }

// const me = new Person("Cho");
// console.log(me.name);

// * 접근자 프로퍼티 (accessor property) - class 예제
// 클래스 정의
class Person {
  // 생성자
  constructor(firstName, lastName) {
    // 인스턴스 프로퍼티 추가 & 초기화
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 프로퍼티로, 접근자 함수인 getter 메서드와 setter 메서드로 구성되더 있다.

  // getter 메서드 정의
  get fullName() {
    return `${this.firstName} ${this.lastName}`; // 반드시 리턴하는 게 있어야 한다.
  }

  // setter 메서드 정의
  set fullName(name) {
    // 반드시 매개변수가 있어야 한다.
    [this.firstName, this.lastName] = name.split(" ");
  }
}

const me = new Person("Hyeonjin", "Cho");

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${me.firstName} ${me.lastName}`); // Hyeonjin Cho

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티인 fullName에 값을 저장하면 setter 메서드가 호출된다.
me.fullName = "Gildong Go";
console.log(me); // Person {firstName: 'Gildong', lastName: 'Go'}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티인 fullName에 접근하면 getter 메서드가 호출된다.
console.log(me.fullName); // Gildong Go

// fullName은 접근자 프로퍼티이다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, "fullName")); // {enumerable: false, configurable: true, get: ƒ, set: ƒ}
