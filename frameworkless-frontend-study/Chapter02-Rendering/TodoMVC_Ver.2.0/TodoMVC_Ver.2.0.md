# Chpater 02 - Rendering

## Rendering Functions

### • Todo MVC

> ### Pure Functions Rendering | 순수 함수 렌더링
>
> ### Pure Functions Rendering Ver.2 - Component Function | 컴포넌트형 함수

<br/>

> What?

This directory contains the refactored codes from the previous directory(TodoMVC_Ver.1.0).

이 디렉토리에서는 TodoMVC 애플리케이션 Ver.1.0의 View 방식인

`'하나의 거대한 함수'가 DOM element 여러 개를 조작`하는 방식이 가진 문제를 해결하기 위해

이를 `'여러 개의 작은 함수들'`로 나누어 리팩토링했습니다.

TodoMVC 애플리케이션 Ver.1.0 에서 view함수의 결합도(Coupling)를 낮추는 작업이자

전체적으로 응집도(Cohesion) 높은 함수들로 구성된 시스템을 만들기 위한 첫번째 시도입니다.

    📃원문 참조

    In the next example, we will divide the view into smaller functions and try to address the consistency problem.

    이를 한글 번역본에서는 consistency를 '일관성 문제'라고 번역하고 있습니다.

    이는 TodoMVC 애플리케이션 Ver.1.0의 view.js가 가진 낮은 응집도와 높은 결합도를 뜻합니다.

<br/>

> 변경된 폴더 구조

```
(Before) Ver.1 - 하나의 거대한 view 함수 방식일 때의 폴더 구조

📦01
┣ 📜getTodos.js
┣ 📜index.html
┣ 📜index.js
┗ 📜view.js

```

```

(After) Ver.2 - 작은 함수들로 나누고, view 함수에서 그것들을 import 해서 사용하는 방식일 때의 폴더 구조

📦02
┣ 📂view
┃ ┣ 📜app.js
┃ ┣ 📜counter.js
┃ ┣ 📜filter.js
┃ ┗ 📜todos.js
┣ 📜getTodos.js
┣ 📜index.html
┗ 📜index.js

```

Ver.1에서 Ver.2로 리팩토링 후 바뀐 부분을 표로 정리해 보았습니다.

| 역할      | 기존(하나의 모듈)                                                                                    | 리팩토링(컴포넌트화)                                                                                                                                             |
| :-------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| li view   | `📜view.js에서 getTodoElement 함수 정의`<br/>`📜view.js에서 export 하는 app view 함수(익명) 內 호출` | `📂view/📜todos.js에서 getTodoElement 함수 정의 → export 하는 익명 함수 內 호출`<br/>`📂view/📜app.js에서 이를 import → export 하는 app view 함수(익명) 內 호출` |
| li count  | `📜view.js에서 getTodoCount 함수 정의` <br/> `📜view.js에서 export 하는 app view 함수(익명) 內 호출` | `📂view/📜counter.js에서 getTodoCount 함수 정의 → export 하는 익명 함수 內 호출`<br/>`📂view/📜app.js에서 이를 import → export 하는 app view 함수(익명) 內 호출` |
| li filter | `📜view.js에서 export 하는 app view 함수(익명) 內 필터링`                                            | `📂view/📜filters.js에서 export 하는 익명 함수 內 필터링` <br/> `📂view/📜app.js에서 이를 import → export 하는 app view 함수(익명) 內 호출`                      |
