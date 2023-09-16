// 예제 1-16 객체의 깊은 복사를 수행하는 범용 함수

var copyObjectDeep = function (target) {
  var result = {};
  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]);
    }
  } else {
    result = target;
  }
  return result;
};

// 예제 1-17 깊은 복사 결과 확인

var obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
  },
};

var obj2 = copyObjectDeep(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj); // { a: 1, b: { c: null, d: [ 1, 3 ] } }
console.log(obj2); // { a: 3, b: { c: 4, d: { '0': 1, '1': 2 } } }
