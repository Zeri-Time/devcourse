import { useState } from 'react'

function NameList() {
  const [list, setList] = useState(['짱구', '짱아', '맹구', '유리'])
  const [input, setInput] = useState('')

  const handleInput = (e) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    setList([input, ...list])
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
          className="border border-white"
          onChange={handleInput}
          onKeyDown={handleEnter}
          value={input}
        />
        <button onClick={handleClick}>입력</button>
        <ul>
          <li>{list}</li>
        </ul>
      </div>
    </>
  )
}
export default NameList
