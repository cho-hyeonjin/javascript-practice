# Chpater 02 - Rendering

## Rendering Functions

### • Todo MVC

> ### Pure Functions Rendering | 순수 함수 렌더링
>
> ### Pure Functions Rendering Ver.2 - Component Function | 컴포넌트형 함수

<br/>

Ver.2.0에서는 Ver.1.0에서의 하나의 거대한 view 함수를 총 3개의 view 함수로 분리하고,

렌더링 엔진 역할을 하는 함수 또한 index.js에서 app.js의 view함수로 바꾸어 작성했습니다.

그 다음 app.js의 view 함수 안에서 나머지 3개의 view 함수를 호출함으로써

app view 함수(익명 함수)의 시그니처를 나머지 3개의 함수가 공유할 수 있도록 리팩토링 했습니다.

앞서 동일한 함수 시그니처를 공유하는 3개의 함수를 `컴포넌트 라이브러리의 첫번째 초안`이라 했는데요,

초안이라 한 데에는 이유가 있습니다. 아직 수정해야 할 부분이 남았기 때문이죠.

이 디렉토리에는 그 수정 작업을 마친 결과물이 담겨있습니다. 과정을 살펴볼까요?

우선 Ver.2.0의 index.js를 보고 리팩토링이 필요한 부분이 어디인지 살펴보겠습니다.

```js
import todosView from './todos.js';
import counterView from './counter.js';
import filtersView from './filters.js';

export default (targetElement, state) => {
  const element = targetElement.cloneNode(true);

  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  // In Ver.2.0, We need to manually invoke the right function.
  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filtersView(filters, state));

  return element;
};
```

보이는 것과 같이 렌더링 함수 안에서 각각의 view 함수를 수동으로 호출해주는 것이 필수입니다.

그런데, `컴포넌트 기반 애플리케이션`은 `선언형 패러다임`을 따라야 합니다.

Ver.2.0의 렌더링 함수에서처럼 수동, 명시적으로 작성하는 코드는 선언적 방식이라 할 수 없습니다.

선언적 방식으로 작성된 코드가 모여 애플리케이션을 이루면, 해당 애플리케이션 모든 부분이 자동으로 연결되는 시스템을 갖게 됩니다.

> ❓ 선언형 패러다임 (Declararive paradigm)

    어떻게(How) 가 아닌 '어떤 것(What)'에 중점을 두고 설계하는 방식을 뜻합니다.
    TodoMVC 애플리케이션을 예로 들면,
    어떤 방식을 통해 렌더링 할 것인지(알고리즘)를 명시하여 시스템을 구축하는 것이 아니라
    어떤 데이터를 렌더링 할 것인지(데이터)에 중점을 두고 시스템을 구축하는 것이 되겠습니다.

Ver.2.0 에서의 렌더링 엔진(app.js)을 선언적 방식을 따르는 컴포넌트 기반 애플리케이션으로 리팩토링 해봅시다.

**아래 두 가지는 '컴포넌트 기반 렌더링 엔진'의 핵심 매커니즘**입니다.

1. `컴포넌트명`을 html 요소의 `data-component 속성값으로 할당`

   data-component 속성은 뷰 함수의 필수 호출을 대체합니다.

   ```html
   <html>
     <head>
       (...)
     </head>
     <body>
       <section class="todoapp">
         <header class="header">(...)</header>
         <section class="main">
           (...)
           <ul class="todo-list" data-component="todos"></ul>
           <!-- ↑ 이 <ul> 노드의 data-component 속성값으로 todos 뷰 컴포넌트명 할당 -->
           <footer class="footer">
               <span class="todo-count" data-component="counter"> 1 Item Left </span>
               <!-- ↑ 이 <span> 노드의 data-component 속성값으로 counter 뷰 컴포넌트명 할당  -->
               <ul class="filters" data-component="filters">(...)</ul>
               <!-- ↑ 이 <ul> 노드의 data-component 속성값으로 filters 뷰 컴포넌트명 할당  -->
               (...)
           </footer>
         </section>
       <footer class="info">(...)</footer>
       <script type="module" src="index.js"></script>
     </body>
   </html>
   ```

2. TodoMVC 애플리케이션에서 사용할 수 있는 모든 컴포넌트의 INDEX인 `컴포넌트 레지스트리(compoenent registry)`로 매핑

   registry 객체 속성의 키(속성명)를 1번 과정에서 data-component 속성값에 할당한 컴포넌트명과 일치하는 이름으로 지어주세요. (반드시)

   아래는 현재 상태에서 구현할 수 있는 가장 간단한 레지스트리입니다.

   ```js
   // 📜registry.js

   const registry = {
     todos: todosView,
     counter: counterView,
     filters: filtersView,
   };
   ```

이런 방식을 view컨테이너(애플리케이션 view 함수들)뿐만 아니라 모든 컴포넌트에 적용해주면,

애플리케이션 내의 모든 컴포넌트가 다른 컴포넌트에서 사용될 수 있게 됩니다.

선언적 패러다임을 따르는 **컴포넌트 기반 애플리케이션**을 만들고 싶다면,

위와 같은 방식의 `컴포넌트 재사용성` 구축은 **필수**입니다.

> ❓ 레지스트리 (Registry)

    레지스트리는 특정 언어나 도구에 국한되는 개념이 아니라 소프트웨어 공학 전반에서 사용되는 개념으로,
    데이터를 저장하거나 관리하는 데에 사용되는 구조를 지칭하는 말입니다.
    레지스트리에는 주로 시스템 설정, 시스템 구성 정보, 프로그램 등록 정보 등의 데이터를 저장합니다.
    예를 들어 운영체제의 레지스트리에는 시스템 설정, 드라이버 정보, 설치된 소프트웨어 등록 정보 등이 저장될 수 있겠습니다.

    그렇다면 자바스크립트의 레지스트리란 무엇일까요?
    쉽게 말하면 객체입니다.
    객체 자체가 데이터를 저장하고 속성을 가지고 있는데,
    그 중에서도 특정 목적에 따라 이름과 값을 매핑하여 정보를 저장하는 객체를 레지스트리라 부릅니다.

    우리는 TodoMVC 애플리케이션을 '컴포넌트 라이브러리'로 전환한다는 목적을 가지고,
    html 요소와 해당 요소를 담당하는 컴포넌트 함수를 매핑한 객체 registry를 생성했습니다.
    registry는 객체 중에서도 레지스트리 객체입니다.

<img style="" width="65%" src="https://github.com/cho-hyeonjin/javascript-practice/assets/78816754/9cade357-2b26-4f9e-a148-c4433127896f">

<span style="font-size: 12px; text-align: center;">▲ 이해를 돕기 위해 레지스트리 개념에 대한 그림을 그려 첨부합니다.</span>

그럼 이제 문제 해결은 간단해 보입니다.

프로젝트 내의 모든 view 컴포넌트 1, 2번 과정을 적용하는 겁니다.

1. 컴포넌트명을 해당 컴포넌트가 담당하는 html요소(DOM 노드)의 data-component 속성값에 할당하고,

2. registry로 매핑해주면 되겠네요.

**그런 다음, 레지스트리를 참조하여 data-component 속성값을 읽고 매핑된 함수(컴포넌트)를 자동으로 호출하는 최상위 객체를 만들어서**

**프로젝트 내의 모든 컴포넌트가 이 최상위 객체를 상속받아 생성되면 되지 않을까요?**

좋은 추측입니다. 하지만 우리는 순수 함수를 사용한 렌더링 엔진을 만들고 있기 때문에 컴포넌트에 객체의 상속을 적용할 수 없습니다.

객체에는 메서드가 포함될 수 있고, 메서드는 함수 외부의 값을 변경시킬 수 있기 때문에 순수함수의 조건에 위배됩니다.