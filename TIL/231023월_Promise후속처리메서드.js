// * Promise 후속 처리 메서드 - Promise.prototype.then
// * Promise의 비동기 처리가 성공해서 fulfiled 상태가 되고 PromiseValue에 비동기 처리 결과가 들어왔을 때 그 값을 후속 처리하는 '성공 처리 콜백'을 첫번째 인수로 받으며
// * Promise의 비동기 처리가 실패해서 rejected 상태가 되고 PromiseValue에 비동기 처리 결과인 에러가 들어왔을 때 그 값을 후속 처리하는 '실패 처리 콜백'을 두번째 인수로 받는다.
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

// * Promise 후속 처리 메서드 - Promise.prototype.catch
// * Promise의 비동기 처리가 실패해서 rejected 상태가 되었을 때만 호출되는 메서드
new Promise((_, reject) => reject(new Error("rejected"))).catch((e) =>
  console.log(e)
); // Error: rejected

// * .then(undefined, rejected 처리 콜백) 과 동일하게 작동
new Promise((_, reject) => reject(new Error("rejected"))).then(undefined, (e) =>
  console.log(e)
); // Error: rejected

// * Promise 후속 처리 메서드 - Promise.prototype.finally
// * Promise의 비동기 처리 성공/실패와 관련 없이 무조건 한 번 호출되는 메서드로,
// * Promise의 비동기 처리 상태와 관련 없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용.
new Promise(() => {}).finally(() =>
  console.log("fainally는 비동기 처리상태와 무관하게 한 번 호출되는 메서드")
); // fainally는 비동기 처리상태와 무관하게 한 번 호출되는 메서드

// ! Promise 후속 처리 메서드 3종을 이용한 예제코드
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

promiseGet("https://jsonPlaceholder.typicode.com/posts/1")
  .then((res) => console.log(res)) // .then은 Promise를 반환
  .catch((err) => console.error(err)) // .then이 리턴한 Promise가 rejected상태인 경우 콘솔에 에러 발생 &&  .catch도 Promise 반환
  .finally(() => console.log("이제는 우리가 헤어져야 할 시간")); // .catch가 리턴한 Promise에 대해 무조건 한 번 호출.  // 이제는 우리가 헤어져야 할 시간
