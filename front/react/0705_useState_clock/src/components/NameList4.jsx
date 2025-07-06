import { useState } from 'react'

function NameList4() {
  const [name, setName] = useState([
    { id: 1, value: '짱구' },
    { id: 2, value: '짱아' },
    { id: 3, value: '맹구' },
    { id: 4, value: '철수' },
  ])
  const [input, setInput] = useState('')

  const handleInput = (e) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    if (input.trim !== '') {
      const newId = name.length >= 1 ? name[name.length - 1].id + 1 : 1
      setName([...name, { id: newId, value: input }])
      setInput('')
    }
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }
  const handleDelete = (id) => {
    setName(name.filter((item) => item.id !== id))
    console.log(name.map((item) => item.value))
  }
  return (
    <>
      <input
        type="text"
        className="border border-white"
        value={input}
        onChange={handleInput}
        onKeyDown={handleEnter}
      />
      <button onClick={handleClick}>입력</button>
      <ul>
        {name.map((item) => (
          <li key={item.id}>
            {item.id} : {item.value}
            <button onClick={() => handleDelete(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </>
  )
}
export default NameList4
