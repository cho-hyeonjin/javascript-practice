// 콜백함수 예제 setInterval

var count = 0;

var timer = setInterval(function () {

    console.log(count);

    if (++count > 4) clearInterval(timer);

}, 300);



// setInterval 구조

var intervalID = scope.setInterval(func, delay [, param1, param2, ...]);

