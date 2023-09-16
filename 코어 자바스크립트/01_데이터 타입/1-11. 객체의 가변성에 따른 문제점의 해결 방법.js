// 예제 1-11 객체의 가변성에 따른 문제점의 해결 방법
var user = {
  name: "Jeanam",
  gender: "male",
};

var changeName = function (user, newName) {
  return {
    name: newName,
    gender: user.gender,
  };
};

var user2 = changeName(user, "Jung");

if (user !== user2) {
  console.log("유저 정보가 변경되었습니다."); // 유저 정보가 변경되었습니다.
}

console.log(user.name, user2.name); // Jeanam Jung
console.log(user === user2); // false
