// promiseGet함수
const promiseGet = (url) => {
  // 새로운 Promise 생성
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // HTTP 요청 'GET'과 인자로 들어온 url값으로 초기화
    xhr.open("GET", url);
    // HTTP 요청 전송
    xhr.send();
    // HTTP 요청 전송이 완료됐을 때 실행되는 코드
    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

// Promise 체이닝
const url = "https://jsonplaceholder.typicode.com";
promiseGet(`${url}/posts/1`)
  .then(({ userId }) => promiseGet(`${url}/users/${userId}}`))
  .then((userInfo) => console.log(userInfo))
  .catch((err) => console.error(err))
  .finally(() => console.log("Finally~🎙️ 날 알고 감싸 준거니?"));
