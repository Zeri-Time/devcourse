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

// const age = [21];

// -----------------배열  불변성
// const fun1 = (value) => {
//     value[0] = 55;
// }
// fun1(age);
// console.log("age: ", age[0]);

//------------------객체 불변성
// const obj = {
//     age: 12
// }
// // console.log(obj);
// const fun2 = (value2) => {
//     value2.age = 44;
// }
// fun2(obj);
// console.log("age: ", obj);

// ----------------불변성 함수

// const arr = [10, 20, 30, 40,];
// const arr2 = arr.slice(0,2);
// console.log(arr2);
// const arr3 = arr.filter((_, i) => i >=2 )
// console.log(arr3);
// const arr4 = arr.filter((element) => element == 10 || element ==30);
// console.log(arr4);
// const arr5 = arr.filter((_, i) => [1,3].includes(i));
// console.log(arr5);
// const arr6 = arr.filter((_, ind) => ![1,3].includes(ind));
// console.log(arr6);
// const arr7 = arr.filter((elem) => [10,40].includes(elem));
// console.log(arr7);

// ----------------불변성 함수

// const arr = [1, 2, 3, 4, 5];

// const arr2 = [arr[0], arr[1], arr[2], arr[3], arr[4], 6 , 7];
// console.log("arr2: ", arr2);
// const arr3 = [...arr, 10, 200];
// console.log("arr3: ", arr3);

// ----------------불변성 함수

// const arr = [1, 2, 3, 4];
// const arr2 = [...arr].reverse();
// console.log(arr2);

// ----------------불변성 함수

// const arr3 = [50, 10 ,220, 1];
// const arr4 = [...arr3].sort((a,b) => a - b);
// console.log("arr3: ", arr3);
// console.log("arr4: ", arr4);

// ----------------불변성 함수

// const arr = [1,2,3,4];
// const arr2 = arr.map((el,i) =>
// [1,2].includes(i) ? el * -1 : el);
// console.log("arr: ", arr);
// console.log("arr2: ", arr2);