// * Promise를 이용한 비동기 처리 방법
// const promise = new Promise((resolve, reject) => {
//   if ( /* 비동기 처리 성공 */ ) {
//     resolve('비동기 처리 결과');
//   } else {
//     /* 비동기 처리 실패 */
//     reject('비동기 처리 실패 이유');
//   }
// });

// ** 어제의 HttpRequest요청 코드를 Promise를 적용한 코드로 바꿔보자.

// * 어제 봤던 코드 - 비동기 처리를 위한 전통적인 콜백 처리 _ XMLHttpRequest를 이용한 HTTP GET 요청 (콜백헬)
const get = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

const url = "https://jsonplaceholder.typicode.com";
// 콜백 결과 이어받는 놈 전달 (콜백의 콜백) - id가 1인 post의 userId 취득
get(`${url}/posts/1`, ({ userId }) => {
  console.log(userId); // 1
  // 콜백의 콜백의 결과 이어받는 놈 전달 (콜백의 콜백의 콜백) - post의 userId를 이용하여 user 정보 취득
  get(`${url}/users/${userId}`, (userInfo) => {
    console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret", ...}
  });
});

// * 어제 봤던 위의 코드를 Promise를 이용한 코드로 리팩토링해보자.
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 받으면 resolve 함수를 호출
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 Promise를 반환한다!
promiseGet("https://jsonplaceholder.typicode.com/posts/1");
