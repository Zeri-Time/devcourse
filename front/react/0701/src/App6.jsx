import './App.css'
import { useState } from 'react'

function App6() {
  const [todos, setTodos] = useState([
    { text: '할일1', completed: false },
    { text: '할일2', completed: false },
    { text: '할일3', completed: false },
  ])

  const [inputValue, setInputValue] = useState('')
  const [deletedTodos, setDeletedTodos] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }])
      setInputValue('')
    }
  }

  const handleCheckboxChange = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (index) => {
    const deleted = todos[index]
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
    setDeletedTodos([...deletedTodos, deleted])
    // 수정 모드 중 삭제 시 수정 상태 해제
    if (editIndex === index) {
      setEditIndex(null)
      setEditValue('')
    }
  }

  const handleEditSave = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, text: editValue } : todo
      )
    )
    setEditIndex(null)
    setEditValue('')
  }

  const handleEditCancel = () => {
    setEditIndex(null)
    setEditValue('')
  }

  return (
    <>
      <div className="flex border border-white p-4 w-[400px] h-full ml-[50px] rounded-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="border border-white rounded-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
          <h2 className="mt-4">할일 목록</h2>
          <ul className="flex flex-col gap-2">
            {todos
              .filter((todo) => !todo.completed)
              .map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {editIndex === index ? (
                    <>
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border rounded p-1 mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleEditSave(index)}
                        className="bg-green-500 text-white rounded-md px-2 py-1 mr-1"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        className="bg-gray-400 text-white rounded-md px-2 py-1"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      {todo.text}
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="text-white rounded-md w-[80px] h-[40px] ml-3"
                      >
                        삭제
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditIndex(index)
                          setEditValue(todo.text)
                        }}
                        className="text-white rounded-md ml-2 w-[80px] h-[40px]"
                      >
                        수정
                      </button>
                    </>
                  )}
                </li>
              ))}
          </ul>
          <h2 className="mt-4">완료된 항목</h2>
          <ul className="flex flex-col gap-2 my-1">
            {todos
              .filter((todo) => todo.completed)
              .map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={todo.completed}
                    onChange={() =>
                      handleCheckboxChange(todos.findIndex((t) => t === todo))
                    }
                  />
                  <span style={{ textDecoration: 'line-through' }}>
                    {todo.text}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(todos.findIndex((t) => t === todo))
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-white rounded-md text-sm w-[80px] h-[40px] ml-3"
                  >
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditIndex(todos.findIndex((t) => t === todo))
                      setEditValue(todo.text)
                    }}
                    className="bg-yellow-400 text-white rounded-md w-[80px] h-[40px] ml-2"
                  >
                    수정
                  </button>
                </li>
              ))}
          </ul>
          <h2 className="mt-4">삭제된 항목</h2>
          <ul className="flex flex-col gap-2 my-1">
            {deletedTodos.map((todo, index) => (
              <li key={index}>
                <span style={{ color: 'gray' }}>{todo.text}</span>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </>
  )
}

export default App6
