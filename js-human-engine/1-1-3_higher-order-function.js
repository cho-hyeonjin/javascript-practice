const add = (a, b) => a + b;

function calculator(func, a, b) {
  return func(a, b);
}

const onClick = () => () => {
  console.log("hello");
};

document.querySelector("#header").addEventListener("click", onClick());
// === document.querySelector('#header').addEventListener('click', () => { console.log('hello'); };)
// 말 되니? 된다!
