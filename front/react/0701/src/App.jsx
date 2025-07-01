import './App.css'
import { useState } from 'react'
import React from 'react';

function App() {
  return (
    <>
      {/* <Naver/><br/>
      <Google/>
      <Age/>
      <Ages/> */}
      {/* <StateTest/> */}
      {/* <LinkX/> */}
      <DeletePrac/>
      
    </>
  )
}

// const Naver = function() {
//   return (
//     <a href='http://www.naver.com' target='_blank'>네이버</a>
//   )
// }

// const Google = () => {
//   return(
//     <a href='http://www.google.com' target='_blank'>구글</a>
//   )
// }

// const ages = [10, 20, 30];
// function Age() {
//   return(
//     <>
//       <div>{ages[0]}</div>
//       <div>{ages[1]}</div>
//       <div>{ages[2]}</div>
//     </>
//   )
// }

// function Ages() {
//   return(
//     <>
//     {ages
//     .filter((myAge) => myAge >= 20)
//     .map((myAge, i) => (
//       <div key={i}>
//         <span style={{color: "red"}}>{myAge}</span>살
//       </div>
//     ))}
//     </>
//   )
// }

// function StateTest() {
//   const [number, setNumber] = React.useState(0);
//   //이렇게 만들면 해당 변수의 변경이 함수의 재실행을 유발하면서 자연스럽게 ui가 갱신된다.
//   return(
//     <>
//     <button 
//     onClick={() => {
//       setNumber(number + 1);
//       console.log(`number: ${number}`);
//     }}>버튼</button>
//     <br/>
//     <span>숫자: {number}</span>
//     </>
//   )
// }

// function MyLink({ text, href }) {
//   return (
//     <a href={href} target="_blank" rel="noopener noreferrer">
//       {text}
//     </a>
//   );
// }

// function LinkX() {
//   const [links, setLinks] = useState([
//     { text: "네이버", href: "https://www.naver.com" },
//     { text: "다음", href: "https://www.daum.net" },
//     { text: "구글", href: "https://www.google.com" },
//     { text: "야후", href: "https://www.yahoo.com" },
//   ]);

//   const deleteItem = (index) => {
//     setLinks(links.filter((_, i) => i !== index));
//   };

//   return (
//     <ul>
//       {links.map((link, i) => (
//         <li key={i}>
//           <MyLink text={link.text} href={link.href} />
//           <button onClick={() => deleteItem(i)}>x</button>
//         </li>
//       ))}
//     </ul>
//   );
// }

function DeletePrac({text}) {
  return(
    <>
    <div>{text}</div>
    </>
  )
}

// 어떤게 삭제될지
const deleteActive = (index) => {
  setTexts(texts.filter((_, i) => i !== index));
};

const textItem = () => {
  const [texts, setTexts] = useState([
    {text: "첫번째"},
    {text: "두번째"},
    {text: "세번째"},
  ])
  const deleteActive = (index) => {
  setTexts(texts.filter((_, i) => i !== index));
};
return(
  <button onClick={() => deleteActive(i)}>x</button>
)
  

};

export default App
