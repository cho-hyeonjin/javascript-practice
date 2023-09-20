// 모던 자바스크립트 Deep Dive 22장 this
//
// 1) 객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.

// const circle = {
//   radius: 5,

//   getDiameter() {
//     return 2 * circle.radius;
//   },
// };

// console.log(circle.getDiameter());

// circle 변수에 할당된 객체 리터럴은 circle에 할당되기 직전에 평가되어 객체가 생성된다. -> 생성된 객체가 circle 변수에 할당된다.
// getDiameter함수는 그 이후에 호출되기 때문에 getDiameter함수 내부에서 자기 자신이 속한 객체가 할당된 변수 circle을 참조할 수 있다.

// ! But!! 이렇게 자기 자신이 속한 객체를 참조하는 '재귀'형식의 참조는 지양해야 한다.
// 💡 (객체 리터럴 말고) 생성자 함수를 이용해서 instance를 생성하는 경우를 알아보자.

// 2) 생성자 함수를 이용한 인스턴스 생성
// ☑️ 생성자 함수를 이용한 인스턴스 생성 > this를 알기 전

function Circle(radius) {
  // 이 시점에는 생성자 함수 Circle()이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.

  아직_모르지만_무언가가_오겠지.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // 이 시점에서 또한 생성자 함수 Circle()이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.

  return 2 * 아직_모르지만_무언가가_오겠지.radius;
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
const circle = new Circle(5);

// ✅ 생성자 함수를 이용한 인스턴스 생성 > this를 만난 후
