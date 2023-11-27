# Chpater 02 - Rendering

## Rendering Dinamic Data | 동적 데이터 렌더링

<br />

이전 버전까지는 정적 데이터를 사용했습니다.

하지만 실제 어플리케이션에서는 사용자나 시스템의 이벤트에 의해 데이터가 변경됩니다.

이번 디렉토리에서는 `동적으로 데이터를 렌더링하는 방식 미리보기`를 진행하겠습니다.

다음 챕터인 'DOM 이벤트 관리'에서는 이벤트 리스너를 이용한 코드들이 많이 등장할 예정이지만,

이번 챕터에서는 [window.setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) API를 이용하여 5초마다 데이터(상태)가 바뀌는 방식으로 리팩토링 합니다.

<br/>

> 폴더 구조

```
📦TodoMVC_Ver.2.1
 ┣ 📂view
 ┃ ┣ 📜counter.js
 ┃ ┣ 📜filters.js
 ┃ ┗ 📜todos.js
 ┣ 📜getTodos.js
 ┣ 📜index.html
 ┣ 📜index.js
 ┗ 📜registry.js
```

> 변경된 부분

```js
// (Before) 📦TodoMVC_Ver.2.1/📂view/📜index.js - 정적 렌더링

import getTodos from './getTodos.js';
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';

import registry from './registry.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

window.requestAnimationFrame(() => {
  const main = document.querySelector('.todoapp');
  const newMain = registry.renderRoot(main, state);
  main.replaceWith(newMain);
});
```

```js
// (After) 📦TodoMVC_Ver.2.1/📂view/📜index.js - 동적 렌더링

import getTodos from './getTodos.js';
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';

import registry from './registry.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
  });
};

// ↓ 아래 부분 추가 - window.setInterval()로 getTodos()를 5초마다 호출한 뒤에 render() 호출.
window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);

render();
```

```js
// 📦TodoMVC_Ver.3.0/📜getTodos.js

const { faker } = window;

const createElement = () => ({
  text: faker.random.words(2),
  completed: faker.random.boolean(),
});

const repeat = (elementFactory, number) => {
  const array = [];
  for (let index = 0; index < number; index++) {
    array.push(elementFactory());
  }
  return array;
};

export default () => {
  const howMany = faker.random.number(10);
  return repeat(createElement, howMany);
};
```
