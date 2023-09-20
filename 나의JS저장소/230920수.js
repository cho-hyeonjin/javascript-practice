// 모던 자바스크립트 Deep Dive 22장 this
//
// 1) 객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.

// 1) 객체 리터럴을 이용한 객체 생성 케이스

// const circle = {

//     radius: 5,

//     getDiameter() {

//         return 2 * circle.radius;

//     },

// };

// console.log(circle.getDiameter());

// circle 변수에 할당된 객체 리터럴은 circle에 할당되기 직전에 평가되어 객체가 생성된다. -> 생성된 객체가 circle 변수에 할당된다.
// getDiameter함수는 그 이후에 호출되기 때문에 getDiameter함수 내부에서 자기 자신이 속한 객체가 할당된 변수 circle을 참조할 수 있다.

// ! But!! 이렇게 자기 자신이 속한 객체를 참조하는 '재귀'형식의 참조는 지양해야 한다.
// 💡 (객체 리터럴 말고) 생성자 함수를 이용해서 instance를 생성하는 경우를 알아보자.

// 2) 생성자 함수를 이용한 인스턴스 생성 케이스 > ☑️ Before 'this'
function CircleBeforThis(radius) {
  생성자함수가_future에_생성할_인스턴스.radius = radius;
}

CircleBeforThis.prototype.getDiameter = function () {
  return 2 * 생성자함수가_future에_생성할_인스턴스.radius;
};

const circleBT = new CircleBeforThis(5);
// console.log(circleBT.getDiameter()); // 에러 날 것임 -> 왜 에러 나는 지 설명해보기!

// 2) 생성자 함수를 이용한 인스턴스 생성 케이스 > ✅ After 'this'
function CircleAfterThis(radius) {
  this.radius = radius;
}

CircleAfterThis.prototype.getDiameter = function () {
  return 2 * this.radius;
};

const circleAT = new CircleAfterThis(5);
console.log(circleAT.getDiameter()); // 10
