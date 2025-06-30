// let a = 5;
// let b = 10;
// console.log("a: ", a, "b: ", b);

//-------------------------------------------------------

// a= 10;
// b= 5;
// console.log("a: ", a, "b: ", b);

//-------------------------------------------------------

// let temp = a;
// a=b;
// b=temp;
// console.log("a: ", a, "b: ", b);

//-------------------------------------------------------

// const d = 10;
// if (d > 5) {
// //참이면 실행
// console.log(true);
// } else{
// //거짓이면 실행
// console.log(fales)
// }

//-------------------------------------------------------

// if (a < 15) {
//     a++
//     console.log(a);
// } else {
// }

//-------------------------------------------------------

// let age = 15;

// if (age <20) {
//     console.log("미성년자입니다.", "나이: ", age);
// } else if (age <30){
//     console.log("성인이며, 30살 미만입니다.", "나이: ", age)
// } else {
//     console.log("30살 이상입니다.", "나이: ", age)
// }

//-------------------------------------------------------

const readline = require('readline');
const sc = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//-------------------------------------------------------

// sc.question("입력하세요: ", (answer) => {
//     sc.question("추가로 입력하세요: ", (answer2) =>  {
    
//     console.log(`입력된 내용: ${answer} & ${answer2} 를 입력했음`);
//     sc.close();
// });
// });

//-------------------------------------------------------

// sc.question("당신의 나이: ", (yourAge) => {
//     const ageNum = parseFloat(yourAge);
//     if(yourAge < 19 || yourAge > 60) {
//         console.log(`당신의 나이는 ${ageNum.toFixed(1)} 입니다. 할인 대상입니다.`)
//     } else {
//         console.log(`당신의 나이는 ${ageNum} 입니다. 할인대상이 아닙니다.`)
//     }
// })

//-------------------------------------------------------

// let x = 1;
// let y = x++;
// //y에 먼저 x를 대입하고 후에 1증가
// console.log("x: ", x); // x: 2
// console.log("y: ",y); // y: 1

// let z=1;
// let e = ++z;
// //z를 먼저 1 증가시키고 후에 e에 대입
// console.log("z: ", z); // z: 2
// console.log("e: ", e); // e: 2

//-------------------------------------------------------

// let i = 1;

// while(i < 10) {
// i++;
// console.log("i: ", i);
// }

// let sum = 0;
// while (i <= 100) {
//     sum += i;
//     i++;
// }
// console.log("sum: ", sum);

//-------------------------------------------------------

// //구구단 8단
// let x = 8;
// let y = 1;
// let result;
// while (y <= 9) {
//     result = x * y;
//     console.log(`${x} * ${y} = ${result}`);
//     y++;
// }

//-------------------------------------------------------

// //구구단
// let x =2;
// let result;
// while (x < 10) {
//     let y =1;
// while (y < 10) {
//     result = x * y;
//     console.log(x , "x", y, "=", result);
//     y++;
// } x++;
// }

//-------------------------------------------------------

// for (i = 0; i < 10; i++) {
//     console.log(i);
// }

// let i = 0;
// sum = 0;
// for (i; i<=100; i++){
//     sum += i;
// }
// console.log("sum: ", sum);

//-------------------------------------------------------

//for문 구구단
// let x = 1;
// let result;
// for (x; x<10; x++){
//     let y= 1;
//     for (y; y<10; y++){
//     result = x * y;
//     console.log(x, "x", y, "=", result);
//     }
// }

//-------------------------------------------------------

// let a = 1;
// let b = 2;
// let sum;

// let func = function hello(){
    //     console.log("test1");
    //     console.log("test2");
    //     console.log("test3");
    // }
    // func();
    
//-------------------------------------------------------

// let func = function hello(language) {
//     let sayHello;
//     if (language == "한국어") {
//         // console.log("안녕하세요");
//         sayHello = "안녕하세요"
//     } else if (language == "일본어") {
//         // console.log("곤니찌와");
//         sayHello = "곤니찌와"
//     } else {
//         // console.log("헬로");
//         sayHello = "헬로"
//     }
//     for (i=0; i<5; i++) {
//         sayHello;
//         console.log(sayHello);
//     }
// }
// func("일본어");

//-------------------------------------------------------

// function printDan(dan, limit) {
//     console.log("== " + dan + "단 출력 ==");
    
//     for ( var i = 1; i <= limit; i++ ) {
//         console.log(dan + " * " + i + " = " + dan * i);
//     }
// }
// printDan(2,3);

//-------------------------------------------------------

const plus = function(a,b) {
    return(a+b);
}
const minus = function(a,b) {
    return(a-b);
}
const divide = function(a,b) {
    return(a/b);
}
const mult = function(a,b) {
    return(a*b);
}

const sum = plus(1,2);
console.log(sum);
const div = plus(7,2);
console.log(div);
const divi = plus(6,1);
console.log(divi);
const multi = plus(2,3);
console.log(multi);

//-------------------------------------------------------