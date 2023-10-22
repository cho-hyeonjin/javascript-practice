// // 콜백 헬 예제
// ✅1
// const get = (url) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(JSON.parse(xhr.response)); ✅2
//     } else {
//       console.error(`${xhr.status} ${xhr.statusText}`);
//     }
//   };
// };

// get("https://jsonplaceholder.tyicode.com/posts/1");

// // ! 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
// // get함수는 비동기 함수.
// // XMLHttpRequest객체의 onload 이벤트 핸들러 함수가 비동기로 동작하는 함수이다.
// // 작동이 되게끔 수정하려면,
// // get함수의 결과를 별도의 변수에 담아
// // 해당 변수를 콘솔에 찍어보면 비동기 함수 처리까지 끝난 결과물을 확인할 수 있다.
// 그렇다면 위에서 ✅1의 부분에 변수를 생성하고, ✅2 부분에서 해당 변수(get함수의 상위 스코프)에 할당한다면?
// onload 함수 안, xhr.sataus가 200이니까 응답값이 있을테고
// 그 조건문을 지난 실행문이 끝나기 전에, 그 실행문 안에서 get 외부 변수에 이 값을 담아버리면 괜찮지 않을까?
let todos;
const get = (url) => {
  const xhr = new XMLHttpRequest();
  // http 요청 초기화
  xhr.open("GET", url);
  // http 요청 전송
  xhr.send();
  // onload는 요청이 성공적으로 완료된 경우에만 실행
  xhr.onload = () => {
    // 응답의 status가 200이면 응답이 성공적으로 완료됐다는 뜻. ∴ 요청한 페이로드에 맞춰서 response에 데이터가 들어와 있을 것임. 1️⃣
    if (xhr.status === 200) {
      todos = JSON.parse(xhr.response); // http로는 JSON 포맷으로 데이터를 주고 받으니까, 다시 원래 js 객체형으로 디시리얼라이징(역직렬화) 2️⃣
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

get("https://jsonplaceholder.typicode.com/posts/1"); // id가 1인 포스트를 취득하겠다는 의도로 호출하는 get 함수
console.log(todos); // 과연?... -> undefined 나옴.

// undefined가 나온다! 왜?
// 자바스크립트의 평가/실행 과정을 생각해보면 간단히 설명이 가능한 문제.
// 평가 과정에서는 가장 먼저 todos 변수가 수집되겠지?
// 그 다음에 get함수가 수집될 테고?
// 그 다음 실행을 할 거야. 더 이상 수집할 정보가 없으니까
// get호출이 있네?
// get 함수 실행 전 평가가 이뤄지겠지. 이 과정에서 get함수의 실행 컨텍스트가 생성되서 콜스택에 쌓일거고,
// get 함수를 실행할꺼야.
// 어? 그럼 console.log보다 결국 onload함수가 먼저 호출되는거 아닌가요? 할 수 있지만,
// xhr에 할당된 객체는 XMLHttpRequest객체이고, 이 객체는 웹api가 제공하는 api이고 자바스크립트로 사용할 수 있게 작성했을 뿐이야.
// onload이벤트는 웹 apir의 소관이지. load 이벤트가 발생하면 태스크 큐에 저장되서 대기하다가~콜 스택이 비었을 때 이벤트 루프가 콜스택으로 푸시해주고 그 때 처리가 되는 거기 떄문에
// 자바스크립트 진영(콜스택)에서 처리하는 console.log 작업이 끝나서 콜스택에서 팝 되어 사라지기 전까지는 실행되지 않아.

// ! 미리 보는 에러 처리 try... catch... finally 문
try {
  setTimeout(() => {
    throw new Error("Error!");
  }, 1000);
} catch (e) {
  console.error("잡았다 요놈", e);
}
// 위 코드 실행 시,
// 1. try 코드 블록이 가장 먼저 실행 됨.
// 2. try 코드 블록에 포함된 문 中 에러 발생 -> catch 문의 error 변수에 전달 & catch 코드 블록 실행
// 3. (위 코드에는 없지만) 에러 발생과 상관 없이 반드시 1번 실행되는 문.
// ! try... catch... finally 문으로 에러를 처리하면 프로그램이 강제 종료되지 않는다고 한다.
