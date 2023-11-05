const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};
// get이 명시적으로 return하는 게 없기 때문에 undefined를 리턴

get("https://jsonplaceholder.tyicode.com/posts/1");
// 비동기 함수 내부의 비동기로 동작하는 코드에서 처리한 결과(onload의 콜백함수가 처리한 결과)는 외부로 반환 불가, 상위 스코프의 변수에 할당하는 것도 당연히 불가.

// --> undefinde
//     GET https://jsonplaceholder.tyicode.com/posts/1 net::ERR_NAME_NOT_RESOLVED
//     위 순서대로 찍힘.
