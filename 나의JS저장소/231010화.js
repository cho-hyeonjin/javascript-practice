// * constructor
class Person {
  // * 생성자
  constructor(name) {
    this.name =  name;
  }
}
//* 클래스 내에 최대 1개까지만 존재 허용
class Class {
  constructor (name) {
    this.name = name;
  }
  constructor (grade) {
    this.grade = grade;
  }
} // Uncaught SyntaxError : A class may only have one constructor 에러 발생
// * 생략 가능, 생략 시 빈 constructor 암묵 생성
// * constructor 생략하고 만든 class는 constructor가 비어있기 때문에 빈 객체를 생성
class Person {
  // 생략 해도 아래의 빈 constructor 생성됨.
  constructor() {}
}

const me = new Person();

console.log(me); // Person {}
// * 프로퍼티가 추가되어 초기화 된 인스턴스 생성 -> constructor 내부에서 this에 프로퍼티 추가
class Person {
  // 인수로 인스턴스 초기화
  constructor(name, address) {
    // constructor.this의 name에 name, 
    //                   address에 address 로 값 초기화
    this.name = name;
    this.adderss = address
  }
}
// 인수로 초기값 전달 → 초기값은 constructor에 전달.
const me = new Person('Lee', 'Seoul');
console.log(me); // Person {name: "Lee", "Seoul"}