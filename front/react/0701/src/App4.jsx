import './App.css'
import { useState, useEffect } from 'react'
import React from 'react';

function App4() {
    return(
        <>
         <CheckList />
        </>
    )
}

const CheckList = () => {
    // 입력값
    const [input, setInput] = useState("");

    // 저장된 목록
    const [todoList, setTodoList] = useState([]);

    // 저장 클릭시 실행될 함수
    const handleClick = () => {
        if (input.trim() === "") return; // 빈값 막기
        // 표시될 객체
       const newItem = {
        name: input
       }
    
       // 기존 항목에 새 항목 추가
       setTodoList([...todoList, newItem]); //여기서 newItem 대신 그냥 input을 넣어도 되는가? -> 가능은함
       // newItem이 객체이기 때문에 사용한듯. -> 아니었음. 객체로 사용한 이유는 다른 요소들이 추가로 
       // 필요한 경우가 있을 수 있기 때문
    
       // 입력창 초기화
       setInput("");
    }

    
    
    return(
        <>
        <input 
        name='todoList'
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='입력하세요'
        className= 'border border-black'
        />
        <button onClick={handleClick}>저장</button>
        <br/>
        {/* <div>{newItem}</div> */}
        {/* 하나의 div가 아닌 리스트를 만들어야하기 때문에 ul사용할거임 */}
        <ul>
            {todoList.map((item, index) => (
                <li key={index}>{item.name}</li>
            ))}
        </ul>
</>
    )
}




export default App4;