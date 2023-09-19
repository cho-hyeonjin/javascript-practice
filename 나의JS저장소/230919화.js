// 자바스크립트 this 공부 중..
// 

// 아래는 📚 '속 깊은 JavaScript' 04장 프로토타입과 객체지향, 그리고 상속 中 '4.1.3 this의 이해' 부분 
// this는 함수가 호출된 위치에 따라 결정되고
// 자바스크립트에서 함수는 객체이며
// 객체라는 것은 어떤 원형 객체를 상속해서 생성했다는 뜻일텐데..(객체지향 언어에서는 class)
// 자바스크립트는 객체지향언어라 하기엔 flexible함
// 그러나 상속 개념이 있다는 것은... 객체지향의 그것을 어떤 식으로든 구현해 냈다는 것인데.. How to?
// '프로토타입'이라는 것을 이용해서 객체지향 언어(Java같은)에서의 '상속'을 구현해냄
// 그렇다면 프로토타입이란 무엇일까? 하다가 아래 코드로 옴

// JavaScript는 Java의 몇몇 문법을 채택하고 있음.
// 대표적인 것은 new 키워드
// (참고) Java -> Object는 class
//       JavaScript -> Object는 function

// 자바스크립트에서 new 키워드로 객체 생성하기 ================================= JavaScript
function PersonJS(name, blog) {
  this.name = name; // ✅ 
  this.blog = blog; // ✅ this.키워드 사용! 초기화 작업.
}

var unikys = new Person("unikys", "unikys.tistory.com"); // 👀 Java new 사용법이랑 비슷한데 ?
alert(unikys.name); // "unikys"

// 자바에서 new 키워드로 객체 생성하기 =================================================== Java
class PersonJ {
  string name;
  string blog;

  public Person(String name, String blog) {
    this.name = name;
    this.blog = blog;
  }

  public String getName(String name) {
    this.name = name;
  }

  public Strign getBlog(String blog) {
    this.blog = blog;
  }

  public void main(String [] args) {
    Person unikys = new Person("unikys", "unikys.tistory.com"); // 👀 JS에서 new 쓸 때랑 비슷한데 ?
    System.out.printIn(unikys.getName());
  }
}


// 정리 👉🏻 JavaScript에서는 function으로 객체 생성, new 키워드로 객체지향 언어의 class 비스무리한거 만들어냄.
// 사실 여기까지는 오늘 공부할 this를 위한 빌드업이었음...
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ! this는 '함수를 호출하는 방법'에 의해 결정됨 
// ! 1) 일반 function으로 호출됐을 때
// ! 2) 멤버함수(멤버함수가 뭐임 첨듣는데?)로 호출됐을 때
// ! 3) call() 함수를 이용해서 호출했을 때
// ! 4) apply() 함수를 이용해서 호출했을 때

// 이제 다시 코어자바스크립트로 돌아가라..