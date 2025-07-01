import './App.css'
import { useState } from 'react'
import React from 'react';

function App2() {
    return(
        <>
        <div onClick={()=> ClickEvent2("네이버")}>클릭</div>
        <div className='container'>박스</div>
        </>
    )
}
const ClickEvent = () => {
    alert("클릭");
}

const ClickEvent2 = (siteName) => {
    alert(`${siteName} 클릭했음`)
}

export default App2;