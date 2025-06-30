// ------------배열 선언-----------
// const arr =[10,20,30];
// arr.push(40,50);
// arr[5]=60;
// console.log(arr);

// ------------객체 선언-------------
// const obj = {
//     gender:"남자",
//     height:"160"
// };
// obj.age = 22;
// console.log(obj);

// const obj2 = {
//     ...obj // 다른 객체의 값 불러오기
// };
// console.log(obj2);

// -----------삼항 연산자-----------------

// let age = 10;
// const adultStr = age >= 20 ? "성인" : "미성년" ;
// console.log(adultStr);

// -------------------------------------------------------

// const arr = [];
// arr.push("사과", "당근", "배");
// console.log(arr);

// -------------------------------------------------------

// const arr = [1, 2, 3];
// arr.push(4, 5);
// arr[5] = 6;

// const obj = {
//     gender: "남자",
//     height: "180"
// }
// obj.age = 21;

// console.log(arr);
// console.log(arr[3]);
// console.log(obj);
// console.log(obj.gender);
// console.log(arr.length);
// console.log(Object.keys(obj).length); // 객체 엘리먼트 개수를 알아내는 방법

// for (let i = 0; i < arr.length; i++) { //배열의 모든 요소를 반복
//     console.log(arr[i]);
// } 
// for (const value of arr) { //동일한 결과
//     console.log(value);
// }

// for (const key in obj) { //객체의 모든 요소를 반복
//     console.log(key);
// }

// -------------------------------------------------------

// const arr = [1, 2, 3];
// console.log(arr); // 1, 2, 3
// const arr2 = [0, ...arr, 4, 5];
// console.log(arr2); // 0, 1, 2, 3, 4, 5
// const [num1, num2, ...extra] = arr2;
// console.log("num1: ", num1); // 0
// console.log("num2: ", num2); // 1
// console.log("extra: ", extra); // 2, 3, 4, 5

// function fun1(a, b, c) {
//     console.log(a, b, c);
// }
// fun1(...arr); //arr의 처음 3개 요소를 매개변수로 받음

// const obj = {
//     age: 21,
//     name: "John",
//     gender: "male"
// };
// const obj2 = {
//     ...obj,
//     age:32, // 동일한 요소는 덮어씌움
//     hobby: "golf"
// };
// console.log(obj);
// console.log(obj2);

// function fun2(obj){ // 배열 전체를 매개변수로 받음
//     console.log("----fun2----")
//     console.log("age: ", obj.age);
//     console.log("gender: ",obj.gender);
//     console.log("name: ",obj.name);
// }
// fun2(obj);

// function fun3({gender, name, age:나이}) {
//     console.log("----fun3----")
//     console.log("gender: ", gender);
//     console.log("name: ", name);
//     console.log("age: ", 나이);
// }
// fun3(obj2);

// for (const listObj in obj2){
//     console.log("listObj: ", listObj);
// }

// -------------------------------------------------------

// const plus1 = function(a,b) {
//     return a + b;
// }
// console.log(`plus1: ${plus1(10,20)}`);

// function plus2(a,b) {
//     return a+b;
// }
// console.log(`plus2: ${plus2(20,20)}`);

// const plus3 = (a,b) => {
//     return a + b;
// }
// console.log(`plus3: ${plus3(30,30)}`);

// const plus4 = (a,b) => a + b;
// console.log(`plus4: ${plus4(50,50)}`);

// -------------------------------------------------------

// const arr = [1,2,3,4,5];
// const resultArr = arr.map((el) => el * el);
// console.log(resultArr);
// const resultArr2 = arr.map((el, i) =>{
//     if (i ===2) {
//         return el * 3;
//     } else
//     return el;
// }
// )
// console.log("resullArr2: ", resultArr2);

// -------------------------------------------------------

// const arr = [1, 2, 3, 4];
// const even = arr.filter((el, i) => el % 2 === 0);
// console.log(even);

// arr.forEach((el, i) => {
// console.log(`index ${i}: ${el}`);
// });

// const sum = arr.reduce((acc, cur, idx) => {
//   console.log(`index ${idx}: acc = ${acc}, cur = ${cur}`);
//   return acc + cur;
// }, 0);

// console.log("최종 합계 sum:", sum);

// -------------------------------------------------------

const arr = [
    {name: "둘리", score: 95},
    {name: "또치", score: 83},
    {name: "짱구", score: 99},
    {name: "맹구", score: 23}
];
const smart = arr
.filter(s => s.score >= 90)
.map(s => s.name);
console.log(smart);
