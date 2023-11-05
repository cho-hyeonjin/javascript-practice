// * 고차 함수라면, 이벤트 전달은 어디서 해줘야 할까?
const add = (a, b) => a + b;

function calculator(func, a, b) {
  return func(a, b);
}

// const onClick = (/* 1 */) => (/* 2 */) => (/* 3 */) => {
//     console.log('hello');
// };

// 고차 함수일지라도 리턴문은 하나! 최종 리턴문을 넣어보면 간단히 알 수 있다! 예를 들어 /* 2 */에 event를 전달한 경우
// document.querySelector('#header').addEventListener('click', onClick());
// === document.querySelector('#header').addEventListener('click', () => { console.log('hello')})
// 최종 리턴문은 (/* 3 */) { console.log('hello'); } 여서 인자에 이벤트가 들어오지 않으므로~

// 정답!
const onClick = () => () => (event) => {
  console.log("hello");
}; // 가 되겠지? 이렇게 하면
document.querySelector("#header").addEventListener("click", onClick());
// === document.querySelector('#header').addEventListener('click', (event) => { console.log('hello')})
// 이렇게 최종 리턴문에 event가 들어온다~!
