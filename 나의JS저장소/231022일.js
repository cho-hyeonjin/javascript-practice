// 콜백 헬 예제

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

get("https://jsonplaceholder.tyicode.com/posts/1");

// ! 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
// get함수는 비동기 함수.
// XMLHttpRequest객체의 onload 이벤트 핸들러 함수가 비동기로 동작하는 함수이다.
// 작동이 되게끔 수정하려면,
// get함수의 결과를 별도의 변수에 담아
// 해당 변수를 콘솔에 찍어보면 비동기 함수 처리까지 끝난 결과물을 확인할 수 있다.
