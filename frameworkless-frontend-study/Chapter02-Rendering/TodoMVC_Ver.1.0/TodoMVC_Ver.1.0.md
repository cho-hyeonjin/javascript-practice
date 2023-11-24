# Chpater 02 - Rendering

## Rendering Functions

### • Todo MVC

> ### Pure Functions Rendering | 순수 함수 렌더링
>
> ### Pure Functions Rendering Ver.1 - Single, huge Function | 하나의 거대한 함수

<br/>

'챕터2 - 렌더링' 에서는 TodoMVC라는 애플리케이션을 만들며 `순수 함수로 요소를 DOM에 렌더링하는 방식`을 알아봅니다.

<img width="100%" alt="스크린샷 2023-11-22 오후 2 22 41" src="https://github.com/cho-hyeonjin/javascript-practice/assets/78816754/db04e809-bd19-4857-8085-f1c4e159f3ba">

> 순수 함수(Pure Function)

    ➀ 오직 매개변수를 통해 전달받은 인자만을 input 값으로 가지는 함수
    ➁ 함수 내부의 로직으로 함수 외부의 상태(값)를 변경시키지 않는 함수
    ➂ input 값으로 동일한 값을 입력받으면 항상 동일한 값을 return 하는 함수
    ➃ 오직 return 값만으로 외부와 소통하는 함수

순수함수로 요소를 DOM에 렌더링 하는 방식이란, `DOM요소가 애플리케이션의 상태에만 의존하는 것`을 의미합니다.

Rendering elements with pure functions means that the DOM elements depend exclusively on the state of the application.

<br/>

이 디렉토리에는 TodoMVC 애플리케이션의 Ver.1.0이 구현되어 있습니다.

Ver.1.0에서의 렌더링 엔진은 `하나의 거대한 함수로 작성된 view 함수`를 이용합니다. (view.js에 구현된 익명 함수)

view.js에서 [Node: cloneNode()](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode) API와 문자열을 이용하여 가상 DOM node를 만들고,

렌더링 엔진 역할을 하는 index.js에서 [Window: requestAnimationFrame()](https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame) API를 이용하여 이를 실제 DOM 요소에 반영합니다.

In our first example, we are going to use strings to render elements.

Ver.1.0도 충분한 performacne(성능)를 보여주지만 View 파트에서 아쉬운 점 2가지가 발견됩니다. `view.js`를 보겠습니다.

1. **하나의 거대한 함수**

   DOM element는 여러개인데 이를 조작하는 함수는 view.js에서 export 하고 있는 익명 함수 하나뿐입니다.

   ```js
   export default (targetElement, state) => {
     const { currentFilter, todos } = state;

     const element = targetElement.cloneNode(true);

     const list = element.querySelector('.todo-list');
     const counter = element.querySelector('.todo-count');
     const filters = element.querySelector('.filters');

     list.innerHTML = todos.map(getTodoElement).join('');
     counter.textContent = getTodoCount(todos);

     Array.from(filters.querySelectorAll('li a')).forEach((a) => {
       if (a.textContent === currentFilter) {
         a.classList.add('selected');
       } else {
         a.classList.remove('selected');
       }
     });

     return element;
   };
   ```

   하나의 함수에서 너무 많은 일을 하고 있죠. 이는 머지 않아 복잡한 상황을 야기할 것입니다.

2. **같은 일을 처리하는 다른 접근방식**

   view.js의 `getTodoElement 함수`는 문자열을 매개로 HTML li element를 를 생성합니다.(가상 DOM 노드)

   todo-count element를 위해서는 간단히 이미 존재하는 element에 테스트만 추가해주면 됩니다.

   filters를 위해서는 classList를 관리하면 됩니다.

<br/>

      📃원문 참조 (p.37)

      Our rendering approach is performant enough using requestAnimationFrame and a virtual node manipulation.
      But our view function is not very readable. There ar two major problem in th code.

      • It’s a single, huge function.

        We have only one function to manipulate different DOM elements. The situation can become messy very easily.

      • There are different approaches to do the same thing.

        We create list items via strings. For the todo count element, we simply add the test to an existing element.
        For the filters, we manage classList.
