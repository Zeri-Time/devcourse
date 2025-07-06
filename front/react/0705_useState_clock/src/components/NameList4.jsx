import { useState } from 'react'

function NameList4() {
  const [name, setName] = useState([
    { id: 1, value: '짱구' },
    { id: 2, value: '짱아' },
    { id: 3, value: '맹구' },
    { id: 4, value: '철수' },
  ])
  const [input, setInput] = useState('')
  // 1. 수정 모드를 위한 state 추가
  const [editingId, setEditingId] = useState(null) // 현재 수정 중인 아이템의 id
  const [editText, setEditText] = useState('') // 수정 중인 아이템의 텍스트

  const handleInput = (e) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    if (input.trim() !== '') {
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
  }

  // 2. 수정 관련 핸들러 함수들 추가
  // '수정' 버튼 클릭 시
  const handleEdit = (id, value) => {
    setEditingId(id) // 수정할 아이템의 id 저장
    setEditText(value) // 입력창에 현재 텍스트 표시
  }

  // '저장' 버튼 클릭 시
  const handleSave = (id) => {
    if (editText.trim() === '') {
      alert('수정할 내용을 입력하세요.')
      return
    }
    // name 배열을 순회하며 id가 일치하는 아이템의 value를 editText로 변경
    setName(
      name.map((item) => (item.id === id ? { ...item, value: editText } : item))
    )
    setEditingId(null) // 수정 모드 종료
    setEditText('')
  }

  // '취소' 버튼 클릭 시
  const handleCancel = () => {
    setEditingId(null) // 수정 모드 종료
    setEditText('')
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
            {/* 3. editingId와 현재 item.id를 비교하여 조건부 렌더링 */}
            {editingId === item.id ? (
              // 수정 모드 UI
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(item.id)}>저장</button>
                <button onClick={handleCancel}>취소</button>
              </>
            ) : (
              // 일반 모드 UI
              <>
                {item.id} : {item.value}
                <button onClick={() => handleEdit(item.id, item.value)}>
                  수정
                </button>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
export default NameList4
