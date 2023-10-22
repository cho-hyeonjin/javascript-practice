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

promiseGet("https://jsonplaceholder.typicode.com/posts/1");
// promiseGet 함수는 Promise를 반환!

// --> Promise {<pending>} 이 찍힘
//     GET https://jsonplaceholder.tyicode.com/posts/1 net::ERR_NAME_NOT_RESOLVED
//     위 순서대로 찍힘.
