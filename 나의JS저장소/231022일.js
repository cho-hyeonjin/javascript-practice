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

// get함수는 비동기 함수.
// XMLHttpRequest메서드는 WebAPI 즉, 브라우저의 소관.
// 자바스크립트로 작성했고, 자바스크립트로 함수 호출 코드를 작성했다 해도
// 호출한 함수가 내부적으로 콜백함수를 가지고, 그 콜백함수는 web api단에서 처리하는 코드라면
// 그 내부 콜백함수 코드 작업 여부와 관계 없이 해당 함수는 즉시 종료된다.
// get함수는 비동기 함수이기 때문에 get함수 자체는 즉시 종료되고
// get함수 내부의 콜백함수는 web api가 처리 중이다.
// ! 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
