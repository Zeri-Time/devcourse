import { useState } from 'react'

function NameList3() {
  const [numb, setNumb] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
  ])
  const [input, setInput] = useState('')

  const handleInput = (e) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    if (input.trim !== '') {
      const newId = numb.length > 0 ? numb[numb.length - 1].id + 1 : 1
      // id 중복 방지를 위해 배열의 마지막 id를 가진 요소 뒤에 새로운 id로 추가한다.
      setNumb([...numb, { id: newId, value: Number(input) }])
      setInput('')
    }
  }
  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }
  return (
    <>
      <div>
        <input
          type="number"
          className="border border-white ml-4"
          onChange={handleInput}
          onKeyDown={handleKey}
          value={input}
        />
        <button onClick={handleClick}>저장</button>
      </div>
      <ul className="ml-5">
        {numb.map((item) => (
          <li key={item.id}>
            id: {item.id} value: {item.value}
          </li>
        ))}
      </ul>
    </>
  )
}
export default NameList3
