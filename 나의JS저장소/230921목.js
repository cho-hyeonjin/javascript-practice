// 소스코드의 평가와 실행
var x;
x = 1;

// 실행 컨텍스트의 역할
const x = 1;
const y = 2;

function foo(a) {
  const x = 10;
  const y = 20;
  console.log(a + x + y);
}

foo(100);

console.log(x + y);

// 소스코드 평가와 실행 순서
// 1. 전역코드 평가. 평가 시 변수나 함수 선언문은 먼저 실행 컨텍스트가 관리하는 스코프* 에 등록된다.
//                                                                 *스코프? === 렉시컬 환경의 환경 레코드
//    > 선언 부분은 평가 단계에서 실행됨. 값 할당 부분은 실행 단계에서 실행 BUT! var로 선언한 변수는 자동으로 undefined로 초기화 되기 때문에 평가 시 undefined 값 할당까지 실행되어 컨텍스트의 스코프(렉시컬 환경의 환경 레코드)에 등록된다고 보면 됨 --> 맞는지 재확인 할 것
// 2. 전역코드 실행. 이 때를 Runtime이라고 하는 것.
// 2-1. 변수에 값 할당하는 코드(선언문은 평가 과정에서 이미 실행되었기 때문.)를 만나면 실행컨텍스트의 스코프에 해당 변수가 있는지 찾는다.
// 2-2. 해당 변수가 있으면 let이나 const로 선언한 변수에 값을 할당하는 코드가 실행된다면 실행 컨텍스트가 관리하는 스코프에 처음으로 등록되고, var로 선언한 변수는 undefined에서 할당한 값으로 등록된다.
// 3. 전역코드 실행 중 함수 호출 코드를 만나면 전역코드 실행을 일시중단하고 함수 코드를 평가하는 작업부터 한다.
//    > 전역코드에서와 마찬가지로 함수 안에서 매개변수나 지역변수 선언문이 있는 경우 선언문을 먼저 실행하여 실행 컨텍스트가 관리하는 지역스코프에 등록된다.
// 4. 함수 코드 실행
// 4-1. 함수 안에서 상위 스코프에 있는 변수를 참조한 경우 스코프 체인을 통해 검색, 실행
