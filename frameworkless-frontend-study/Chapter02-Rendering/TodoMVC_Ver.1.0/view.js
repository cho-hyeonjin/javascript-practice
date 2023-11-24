// 📃 view 역할을 하는 파일
// Simple Rendering Engine Ver.2 is also based on 'requestAnimationFrame()' API.
// In Ver.2, ver.1(single & huge view function) was Divide Into Smaller Functions(todos.js, counter.js, filter.js).
// Then, imported them into 'app.js' and using in view function(anonymouse function).

const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
  <li ${completed ? 'class="completed"' : ''}>
    <div class="view">
      <input 
        ${completed ? 'checked' : ''}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left';
  }

  return `${length} Items left`;
};

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
