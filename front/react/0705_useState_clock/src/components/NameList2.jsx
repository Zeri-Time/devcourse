import { useState } from 'react'

function NameList2() {
  const [name, setName] = useState(['이름1', '이름2', '이름3'])
  const [input, setInput] = useState('')
  const handleInput = (e) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    setName([input, ...name])
    setInput('')
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }
  return (
    <>
      <div>
        <input
          type="text"
          onChange={handleInput}
          className="border border-white"
          onKeyDown={handleEnter}
          value={input}
        />
        <button onClick={handleClick}>저장</button>
      </div>
      <ul>
        {name.map((names, index) => (
          <li key={index}>{names}</li>
        ))}
      </ul>
    </>
  )
}
export default NameList2
