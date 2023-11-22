// 📃 controller 역할을 하는 파일
// - This is Rendering Engine based on requestAnimationFrame()
//   Every DOM manipulation, or animation, should be based on DOM API.
import getTodos from './getTodos.js';
import view from './view.js';

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
