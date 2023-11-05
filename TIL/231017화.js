// * 프로토타입 메서드와 인스턴스 메서드의 차이를 보여주는 코드

// 생성자 함수 정의
function Actor(name) {
  this.name = name;
}

// ✅ 프로토타입에 메서드 추가 정의 --- 프로토타입 메서드
Actor.prototype.introduce = function () {
  console.log(`안녕하세요, 배우 '${this.name}'입니다.`);
};

// 💥 Actor 생성자 함수의 인스턴스 생성 💥
const actor1 = new Actor("마동석");
const actor2 = new Actor("손석구");

// ✅ 프로토타입 메서드 호출
actor1.introduce(); // "안녕하세요, 배우 '마동석'입니다."
actor2.introduce(); // "안녕하세요, 배우 '손석구'입니다."
// =============================================== -----> 둘다 같은 생성자로부터 생성되었기 때문에 원형 객체인 prototype이 같으므로,
//                                                        prototype에 정의된 프로토타입 메서드를 [[prototype]]체인(통로)을 통해
//                                                        참조할 수 있다.

// 💥주목💥 인스턴스에 메서드 추가 정의 --- 인스턴스 메서드
actor2.sayHello = function () {
  console.log(`안녕? 나 ${this.name}인데, 너 납치된 거야.`);
};
actor1.sayJinsil = function () {
  console.log(`${this.name}: 진실의 방으로.`);
};

// 💥호출까지 주목💥 인스턴스 메서드 호출
actor2.sayHello(); // "안녕? 난 손석구인데, 너 납치된 거야."
actor1.sayJinsil(); // "마동석: 진실의 방으로."
actor2.sayJinsil(); // Error: actor2.sayJinsil is not a function
// ============================================================= -----> 두 메서드는 인스턴스가 생성된 뒤에 이미 존재하는 인스턴스 중
//                                                                      특정 인스턴스를 지정하여 정의한 메서드이기 때문에
//                                                                      프로토타입 체인이 아닌, 특정 인스턴스에만 존재하는 함수임.
//                                                                      sayHello()의 경우엔 손석구 인스턴스인 actro2에만 존재하는 메서드이고
//                                                                      sayJinsil()의 경우엔 마동석 인스턴스인 actor1에만 존재하는 메서드임.
// 마찬가지 이유로 actor2 인스턴스가 생성된 뒤 actor2 인스턴스를 특정하여 정의한 인스턴스 메서드이기 때문에 에러가 뜨는 것을 확인 할 수 있음
