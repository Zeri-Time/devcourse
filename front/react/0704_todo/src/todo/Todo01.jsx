import { useEffect, useRef, useState } from 'react'

function TodoPrac01() {
  const [names, setNames] = useState(['짱구', '맹구', '철수', '유리'])

  const [inputValue, setInputValue] = useState('')
  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = () => {
    if (inputValue.trim() !== '') {
      setNames([...names, inputValue])
      setInputValue('')
    }
  }

  const handleDelete = (deleteIndex) => {
    setNames(names.filter((_, i) => i !== deleteIndex))
  }

  return (
    <>
      <input
        className="border border-white rounded-md"
        type="text"
        placeholder="입력하세요."
        onChange={handleInput}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick()
          }
        }}
      />
      <button onClick={handleClick}>입력</button>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => handleDelete(index)}>삭제</button>
            {/* 화살표 함수로 담는 이유는 그냥 함수를 호출하면 
            렌더링할때 함수가 즉시 실행되어 버리기 때문 */}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoPrac01
