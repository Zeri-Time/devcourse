import { useState } from 'react'

// 커스텀 훅 이름은 'use'로 시작해야 합니다.
// 초기 이름 목록을 인자로 받습니다.
export function useNameList(initialNames = []) {
  const [name, setName] = useState(initialNames)
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState(null) // 현재 수정 중인 아이템의 id
  const [editText, setEditText] = useState('') // 수정 중인 아이템의 텍스트

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    if (input.trim() !== '') {
      const newId = name.length > 0 ? Math.max(...name.map((n) => n.id)) + 1 : 1
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

  const handleEdit = (id, value) => {
    setEditingId(id)
    setEditText(value)
  }

  const handleSave = (id) => {
    if (editText.trim() === '') {
      alert('수정할 내용을 입력하세요.')
      return
    }
    setName(
      name.map((item) => (item.id === id ? { ...item, value: editText } : item))
    )
    setEditingId(null)
    setEditText('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditText('')
  }

  // 컴포넌트에서 사용할 상태와 함수들을 객체로 묶어 반환
  return {
    name,
    input,
    editingId,
    editText,
    setEditText,
    handleInput,
    handleClick,
    handleEnter,
    handleDelete,
    handleEdit,
    handleSave,
    handleCancel,
  }
}
