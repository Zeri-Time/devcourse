import './App.css'
import { useState, useEffect } from 'react'
import React from 'react';

function App3() {
    return(
        <>
        <Counter />
        <UserInfo />
        </>
    )
}

function Counter(){
    const [count, setCount] = useState(0);

    const increse = () => {
        setCount(count + 1);
    }
    const reset = () => {
        setCount(0);
    }
    return(
        <div>
            <h1>현재 카운트: {count}</h1>
            <button onClick={increse}>+1 증가</button>
            <button onClick={reset}>초기화</button>
        </div>
    )
}

function UserInfo() {
    const [name, setName] = useState("둘리");
    const [age, setAge] = useState(20);

    useEffect(()=> {
        console.log("변경된 이름: ", name);
    })

    const nameChange = (e) => {
        setName(e.target.value);
    }
    

    return (
        <>
        <div>이름: {name}</div>
        <div>나이: {age}</div>
        <button onClick={() => setAge(age + 1)}>나이 1살 증가</button>
        <div>
            <input
            type='text'
            value={name}
            onChange={nameChange}
            placeholder='이름을 입력하세요'
            className='border p-1 rounded bg-gray-800'
            />
            <p>안녕하세요, {name}님</p>
        </div>
        </>
    )
}

export default App3;