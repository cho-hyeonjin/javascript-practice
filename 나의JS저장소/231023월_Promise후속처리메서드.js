// * Promise 후속 처리 메서드 - Promise.prototype.then

// * 후속처리 메서드 then은 Promise의 비동기 처리가 성공해서 fulfiled 상태가 되고 PromiseValue에 비동기 처리 결과가 들어왔을 때 그 값을 후속 처리하는 '성공 처리 콜백'을 첫번째 인수로 받으며
// *                   Promise의 비동기 처리가 실패해서 rejected 상태가 되고 PromiseValue에 비동기 처리 결과인 에러가 들어왔을 때 그 값을 후속 처리하는 '실패 처리 콜백'을 두번째 인수로 받는다.
// *
// * 또한 then은 언제나 Promise객체를 반환한다.

// 1. [[PromiseStatus]]: "fulfiled"
new Promise((resolve) => resolve("fulfiled")).then(
  (v) => console.log(v, "성공 처리 콜백 실행됨"),
  (e) => console.error(e, "실패 처리 콜백 실행됨")
); // fulfiled 성공 처리 콜백 실행됨

// 2. [[PromiseStatus]]: "rejected"
new Promise((_, reject) => reject(new Error("rejected"))).then(
  (v) => console.log(v, "성공 처리 콜백 실행됨"),
  (e) => console.error(e, "실패 처리 콜백 실행됨")
); // rejected 실패 처리 콜백 실행됨
