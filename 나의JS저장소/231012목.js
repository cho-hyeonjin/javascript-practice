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

new Character("둘리");
