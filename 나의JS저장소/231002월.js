// ✅ 클래스를 상속받은 인스턴스에서의 static메서드, prototype메서드

var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
// => 클래스 정의 -> Rectangle변수에 생성자함수를 할당 (Class/Constructor 생성)

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
// => 프로토타입 메서드 정의 -> Rectangle클래스의 prototype프로퍼티 內에 getArea메서드 정의

Rectangle.isRectangle = function (instance) {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
};
// => 스태틱 메서드 정의 -> Rectangle클래스(객체)의 프로퍼티로서의 메서드인 isRectangle메서드 정의

var rect1 = new Rectangle(3, 4);
// => 인스턴스 생성 -> Rectangle생성자 함수를 new키워드로 인자를 전달하며 호출

console.log(rect1.getArea()); // 3 * 4 = 12 ∴ 콘솔에 12 찍힐 것임
console.log(rect1.isRectangle(rect1)); // rect1에는 Rectangle을 상속받은 객체가 들어있고,
//                                        클래스를 상속한 인스턴스는 그 클래스의 prototype프로퍼티만 상속받는다고 했음.
//                                        하지만, isRectangle은 Rectangle클래스의 프로퍼티로 정의된 메서드이고,
//                                        Rectangle의 prototype에는 정의되어 있지 않음.
//                                        ∴ Uncaught TypeError: rect1.isRectangle is not a function 에러 찍힐 것임
//                                        => 인스턴스에서는 클래스에 직접 접근할 수 없다!
console.log(Rectangle.isRectangle(rect1)); // rect1의 width는 3, height는 4이기 때문에 true가 뜰 것임 => 인스턴스에 접근하기 위해서는 클래스를 this로 해서 호출해야만 가능하다.
