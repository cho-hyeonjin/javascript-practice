const add = (a, b) => a + b;

function calculator(func, a, b) {
  return a, b;
}

// 만약에 func에 add()이 들어왔다 가정하면
calculator(add(), 3, 5); // calculator( undefined + undefined 니까 undefined, 3, 5)
// 그래서 결론적으로 function calculator(undefinde, 3, 5) 가 되는 것.
// 말이 된다 안된다? 안된다!

// 좀 더 느낌 오는 예제👇🏻
document.querySelecotor("#header").addEventListener("click", add());
// === document.querySelecotor('#header').addEventListener('click', undefined + undefined);
// === document.querySelecotor('#header').addEventListener('click', undefined); // 말 안 되지~?
