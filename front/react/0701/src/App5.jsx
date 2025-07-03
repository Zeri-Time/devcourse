import './App.css'
import { useState } from 'react'
import React from 'react'

function App5() {
    return (
        <>
            <TodoList />
        </>
    )
}

const TodoList = () => {
    const [todos, setTodos] = useState([
        { text: '공부하기', completed: false },
        { text: '게임하기', completed: false },
        { text: '운동하기', completed: false },
    ])
    const [input, setInput] = useState('')

    const onCreate = (e) => {
        e.preventDefault()
        if (input.trim() !== '') {
            setTodos([...todos, { text: input, completed: false }])
            setInput('')
        }
    }

    const removeTodo = (index) => {
        const filterTodo = todos.filter((_, i) => i !== index)
        setTodos(filterTodo)
    }

    const toggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    return (
        <>
            <form onSubmit={onCreate} className="flex">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="type in list."
                    type="text"
                    className="border p-2 rounded mr-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    추가
                </button>
            </form>
            <ul className="p-0">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className="p-2 flex items-center justify-between"
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(index)}
                            className="mr-2"
                        />
                        <span
                            style={{
                                textDecoration: todo.completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => removeTodo(index)}
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App5
