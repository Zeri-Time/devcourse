// --------------배열의 요소 나열
// const arr = [1,2,3];
// for(let i = 0; i < arr.length; i++){
//     console.log(arr[i]);
// }

// --------------구구단 8단
// let e= 8;
// for(let i= 1; i <=9; i++) {
//     const result = e * i;
//     console.log(`${e} * ${i} = ${result}`);
// }

// --------------삼항연산자
// const age = 10;
// const isAdult = age >= 20 ? "성인" : "미성년자";
// console.log(isAdult);

// --------------구조분해할당
// const arr = [1, 2, 3, 4, 5];
// const [num1, , num3] = arr;
// console.log(num1, num3);

// const obj = {
//     name: "Zack",
//     age: 20,
//     isStudent: false
// };

// const {name, age, isStudent} = obj;
// console.log(isStudent);

// --------------전개연산자
// const arr1 = [1,2,3];
// const arr2 = [3, ...arr1, 4];
// console.log(arr2);

// --------------다양한 함수 작성법
// const fun1= function(a,b) {
//     return a + b;
// }

// function fun2(a,b){
//     return a + b;
// }
// const fun3 = (a,b) => {
//     return a+b;
// }

// const fun4 = (a,b)=>a+b;

// let a = 3, b = 4;

// console.log(fun1(a,b), fun2(a,b), fun3(a,b), fun4(a,b))

//  --------------join함수
// arr = [1, 2, 3];
// console.log(arr.join("번\n") + "번")

// --------------slice 함수
// const arr = [1,2,3,4,5,6,7,];
// const arr2 = arr.slice(1,6);
// console.log(arr2);

// --------------indexOf
// const arr = [1,2,3,3,4,4,5,5,6];
// const index = arr.indexOf(6);
// console.log(index);

// --------------forEach
// const arr = ["사과","당근","수박","딸기"];
// arr.forEach((elemtnt, index) => {
//     // console.log(`${index+1}번은 ${elemtnt}`);
//     console.log(`내가 산 과일은 ${elemtnt} 입니다`)
// })

// --------------map
// const arr = [1,2,3,4,5,6,7,8];
// const bigNum = arr.filter((el) => el > 3);
// console.log(bigNum);

// const resultArr = arr.map((el, i) => {
//     const double = el * 2;
//     console.log(`${i+1}번 x 2 = ${double}`);
// });