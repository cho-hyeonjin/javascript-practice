// * class filed란?
// * class filed(또는 class member)는 클래스 기반 객체지향 언어(대표적으로 Java)에서 class가 생성할 instance의 property를 가리키는 용어.
// 자바로 예를 들어보면,
// class정의 in Java =======================================================
// public class Person {
//   // 1. class filed 정의
//   //    class filed는 class body에 this 없이 선언해야 함.
//   private String firstName = "";
//   private Strign lastName = "";

//   // 생성자
//   Person(String firstName, String lastName) {
//     // 3. 자바에서 this는 언제나 class가 미래에 생성할 instance를 가리킨다.
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
//   public String getFullName() {
//     // 2. class filed 참조
//     //    this 없이도 class filed를 참조할 수 있다.
//     return firstName + " " + lastName;
//   }
// }
// =========================================================================

// * (프로토타입 체인을 이용한 상속이 아닌) 상속을 통한 클래스 확장
// * class는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends가 제공된다.
// > extends키워드 사용 예시
// super class
class Base {}
// sub calss
class Derived extends Base {}
// > extends키워드를 이용한 생성자 함수 상속하기 & 생성자 함수 상속된 클래스로 확장하기 예시
// super class candidate1
function Base1() {}
// super class candidate2
class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속대상을 결정하는 sub class
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
