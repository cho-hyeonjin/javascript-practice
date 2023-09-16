// 예제 1-12 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얕은 복사)

var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};

var user = {
  name: "Jeanam",
  urls: {
    portfolio: "https://github.com/abc",
    blog: "https://blog.com",
    facebook: "https://facebook.com.abc",
  },
};

// 예제 1-15 중첩된 객체에 대한 깊은 복사

var user2 = copyObject(user);
user2.urls = copyObject(user.urls);

user.urls.portfolio = "https://portfolio.com";
console.log(user.urls.portfolio === user2.urls.portfolio); // false

user2.urls.blog = "";
console.log(user.urls.blog === user2.urls.blog); // false
