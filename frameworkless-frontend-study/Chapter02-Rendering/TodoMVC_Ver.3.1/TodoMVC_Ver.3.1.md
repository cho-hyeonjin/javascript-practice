# Chpater 02 - Rendering

## Rendering Dinamic Data | 동적 데이터 렌더링

### • The Virtual DOM | 가상 DOM

<br />

이 디렉토리에서는 Ver.3.0에서 windows.setInterval() API를 이용하여 동적 데이터를 렌더링하던 방식에서

**가상 DOM을 적용한 방식으로 리팩토링** 합니다.

> 💡 recap!

    🏗️ 렌더링 엔진 설계 시 염두에 둬야 하는 3가지

    ① 가독성(readability)
    ② 유지관리성(maintainability)
    ③ 성능(performance)

`가상 DOM을 적용하는 것`은 이 중 ③번째 요소인 `'성능'을 개선시키는 방법`입니다.

가상 DOM은 **선언형으로 작성된 렌더링 엔진의 성능을 개선**시키는 방법입니다.

가상 DOM을 이용한 방식을 알아보기 전에 '조정(reconciliation)' 개념을 알고 가야 합니다.

**브라우저 UI 표현값은 메모리에 유지되고, 실제 DOM과 동기화 됩니다.** 이 과정을 **조정(reconciliation)** 이라고 부릅니다.

(이 과정이 흔히 알고 있는 **reflow, repaint** 단계에 해당합니다.)

그리고 이 과정(reconciliation, 조정)은 성능상 가능한 한 최소한의 횟수로 실행되는 편이 좋습니다.

이전 버전(Ver.3.0)까지는 렌더링 메서드에서 [replaceWith()](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith) 메서드를 이용하여 렌더링하는 방식으로 구현되어 있었습니다.

실제 DOM을 조작하여 렌더링 할 때마다 새로 그리기 때문에,

이러한 방식으로 작성된 애플리케이션은 reconciliation(조정, reflow ~ repaint)이 잦은, 성능 면에서 아쉬운 애플리케이션이라 할 수 있습니다.

    📃원문 참조(p.46)
    The virtual DOM concept, made famous by React, is a way to make a declarative rendering engine a performant one. The representation of a UI is kept in memory and synced with the “real” DOM, which does the least number of operations possible. This process is called reconciliation.

가상 DOM을 활용하면 잦은 조정(reconciliation)으로 인한 성능적인 아쉬움을 해소할 수 있습니다.

**가상 DOM의 핵심은 `diff 알고리즘`입니다.**

이 알고리즘은 실제 DOM을 가상DOM요소의 사본으로 바꾸는 가장 빠른 방법을 찾아냅니다.

    📃원문 참조(p.47)
    The core of the virtual DOM is a diff algorithm that easily understands the fastest way to turn the real DOM into an exact copy of the new DOM element that is detached (in other words, virtual) from the document.

<img width="661" src="https://github.com/cho-hyeonjin/javascript-practice/assets/78816754/113db5d5-5e29-4096-a96e-325d225f3fd8">

<br/>

> 폴더 구조

```
(Before) - replaceWith() 메서드를 이용한 실제 DOM 조작(Too Much Reconciliation)

📦TodoMVC_Ver.3.0
 ┣ 📂view
 ┃ ┣ 📜counter.js
 ┃ ┣ 📜filters.js
 ┃ ┗ 📜todos.js
 ┣ 📜getTodos.js
 ┣ 📜index.html
 ┣ 📜index.js
 ┗ 📜registry.js
```

```
(After) - 가상 DOM을 이용한 diff 알고리즘 적용

📦TodoMVC_Ver.3.1
 ┣ 📂view
 ┃ ┣ 📜counter.js
 ┃ ┣ 📜filters.js
 ┃ ┗ 📜todos.js
 ┣ 📜applyDiff.js ✨👀New!
 ┣ 📜getTodos.js
 ┣ 📜index.html
 ┣ 📜index.js
 ┗ 📜registry.js

```

> 변경된 부분

```js
// (Before) 📦TodoMVC_Ver.3.1/📂view/📜index.js - 렌더링 컨트롤러 (Too Much Reconciliation)

(...)

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain); // replaceWith 메서드를 사용하여 실제 DOM 조작
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render(); // 렌더링 될 때마다 매번 실제 DOM 다시 그림
}, 5000);

render();

```

```js
// (After) 📦TodoMVC_Ver.3.1/📂view/📜index.js - 렌더링 컨트롤러 (가상 DOM 이용, diff 알고리즘 적용)

(...)
import applyDiff from './applyDiff.js';
(...)

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain); // 📜applyDiff.js에 작성된 메서드.
    // document.body = 현재 DOM 노드의 부모 노드
    // main = 실제 DOM 노드의 부모 노드
    // newMain = 새로운 가상 DOM 노드의 부모 노드
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 1000);

render();

```

```js
// 📦TodoMVC_Ver.3.1/📜applyDiff.js - applyDiff() 메서드

const isNodeChanged = (node1, node2) => { ... };

const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) { // 새 노드(가상 DOM 노드)가 정의되지 않은 경우
    realNode.remove(); // 실제 DOM 노드 삭제
    return;
  }

  if (!realNode && virtualNode) {  // 새 노드(가상 DOM 노드)가 정의되지 않았지만 가상 DOM 노드가 존재하는 경우
    parentNode.appendChild(virtualNode); // 부모 DOM 노드의 자식 노드로 새 노드 추가
    return;
  }

  if (isNodeChanged(virtualNode, realNode)) { // 두 노드 모두 정의된 경우 두 노드 간의 차이가 있는지 확인하는 메서드로, boolean 값을 리턴합니다.
    realNode.replaceWith(virtualNode); // isNodeChanged가 true로 평가된 경우 실제 DOM 노드를 가상 DOM 노드로 변경
    return;
  }


  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) { // 모든 하위 노드에 diff 알고리즘 적용
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
```

아래 diff 알고리즘에서는 하나의 노드가 다른 하나의 노드와 비교해서 변경되었는지 확인하기 위해 검사를 수행합니다.

```js
// 📦TodoMVC_Ver.3.1/📜applyDiff.js - isNodeChanged() 메서드

// length를 이용하여 속성 수가 다른지 검사
const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  // Array.from으로 n1Attributes를 배열로 변환하고, 각 속성의 name을 확인한 뒤, 두 노드의 해당 속성 값을 비교하여 다른 속성을 찾아 differentAttribute라는 변수(상수)에 할당합니다.
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  // differentAttribute가 존재하면 true를 반환하는 방식으로 하나 이상의 속성이 변경되었는지 검사
  if (differentAttribute) {
    return true;
  }

  // 두 노드 모두에 자식이 없으면서 textContent까지 다른지 검사
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (parentNode, realNode, virtualNode) => { ... };

export default applyDiff;
```

이렇게 해서 diff 알고리즘을 이용해 렌더링 엔진의 성능을 높이는 작업까지 해봤습니다.

<br/>

<br/>

# 📋 챕터 2에서 한 작업

1. 하나의 거대한 렌더링 함수로 렌더링 엔진을 구현했습니다.

2. 하나의 거대한 함수의 결합도를 낮추기 하기 위해 컴포넌트로 분리했습니다.

3. 컴포넌트형 애플리케이션으로 거듭나기 위해 선언형 패러다임을 적용하여
   리팩토링 했습니다.

4. 정적 데이터를 렌더링하는 코드에서 동적 데이터를 렌더링하는 코드로 리팩토링 했습니다.

5. 성능을 높이기 위해 실제 DOM을 조작하는 방식에서 가상 DOM을 이용한 diff 알고리즘으로 작동하는 방식으로 리팩토링 하였습니다.
