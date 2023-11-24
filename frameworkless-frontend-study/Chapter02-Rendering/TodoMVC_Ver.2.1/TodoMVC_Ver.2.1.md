# Chpater 02 - Rendering

## Rendering Functions

### • Todo MVC

> ### Pure Functions Rendering | 순수 함수 렌더링
>
> ### Pure Functions Rendering Ver.2 - Component Function | 컴포넌트형 함수

<br/>

이 디렉토리에서는 Ver.2.0을 리팩토링합니다.

Ver.2.0 에서는 하나의 거대한 view함수를 컴포넌트형으로 분리하여 작성하는 작업을 진행했습니다.

하지만 Ver.2.0에도 아쉬운 점이 발견됩니다. 렌더링 엔진 역할을 하는 `app.js`를 보겠습니다.

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

보이는 것과 같이 각각의 함수를 수동으로 명시하여 호출해줘야 합니다.

따라서, 아직은 TodoMVC 애플리케이션을 컴포넌트 기반 애플리케이션이라 부르기엔 조금 부족한 상태라 할 수 있습니다.

컴포넌트 기반의 애플리케이션은 '선언형 패러다임'을 따라야 하기 때문입니다.

선언형 패러다임에 기반하여 작성된 애플리케이션의 내부 시스템은 모든 부분을 자동으로 연결합니다.

> ❓ 선언형 패러다임

    '어떻게(How)'가 아닌 '어떤 것(What)'에 중점을 두고 설계하는 방식을 뜻합니다.
    TodoMVC 애플리케이션을 예로 들면, 어떤 방식을 통해 렌더링 할 것인지(알고리즘)를 명시하여 시스템을 구축하는 것이 아니라
    어떤 데이터를 렌더링 할 것인지(데이터)에 중점을 두고 시스템을 구축하는 것이 되겠습니다.

선언형 패러다임에 기반한 애플리케이션이라 말할 수 있으려면, 컴포넌트 간의 상호작용에 선언적 방식이 사용돼야 합니다.

따라서, 이 디렉토리에서는 Ver.2.0의 app view 함수에서 컴포넌트 함수를 수동으로 호출하는 코드를 선언형으로 리팩토링하는 작업을 진행했습니다.
