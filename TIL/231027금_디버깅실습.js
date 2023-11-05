function sum(num) {
  let total = 0;
  for (let i = 0; i < num; i++) {
    total += i;
    printTotal(total);
  }
  return total;
}

function printTotal(num) {
  console.log("Bug🐛: 너는 내가 여기서 코드 갉아 먹고 있는 거 모르지~?");
  console.log(`total: ${num}`);
  console.log("logging");
}

const result = sum(10);
console.log(result);
