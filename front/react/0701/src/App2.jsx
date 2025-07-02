import './App.css'
import { useState } from 'react'
import React from 'react';

function App2() {
    const name = "John";
    const naver = {
        name: "네이버",
        href: "http://www.naver.com",
        rel: "noopener noreferrer",
        target: "_blank"
    }
    return(
        <>
        <div onClick={()=> ClickEvent2("네이버")}>클릭</div>
        <div className='w-[300px] h-[300px] bg-red-500 items-center justify-center flex hover:bg-red-300'>박스</div>
        <div className='text-red-200 opacity-40 text-xl'>안녕{name}</div>
        <a href={naver.href} rel={naver.rel} target={naver.target}>{naver.name}</a>
        <div className='transition duration-300 hover:scale-105 active:text-green-300'>호버액션</div>
        <div className='border border-white w-[200px] rounded-full'>박스</div>
        </>
    )
}


export default App2;