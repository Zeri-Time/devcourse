import Header from './components/Header.js'
import TodoForm from './components/TodoForm.js'
import TodoList from './components/TodoList.js'

const LOCAL_STORAGE_KEY = 'todos-vanilla-js'

function App({ $target }) {
  // 1. App 컴포넌트가 생성될 때 localStorage에서 데이터를 불러옵니다.
  const getInitialState = () => {
    try {
      const storedTodos = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      // 저장된 데이터가 있으면 파싱하고, 없으면 기본값 사용
      return storedTodos
        ? JSON.parse(storedTodos)
        : [
            { id: 1, text: '자바스크립트 공부하기' },
            { id: 2, text: '컴포넌트 구조 파악하기' },
          ]
    } catch (e) {
      console.error('Failed to load or parse todos from localStorage', e)
      return [] // 에러 발생 시 빈 배열 반환
    }
  }

  this.state = {
    todos: getInitialState(),
  }

  // 2. setState에 저장 로직을 통합하여 모든 상태 변경이 저장되도록 합니다.
  this.setState = (nextState) => {
    this.state = nextState
    todoList.setState(this.state.todos)
    try {
      // 상태가 변경될 때마다 localStorage에 todos 배열만 저장합니다.
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.todos)
      )
    } catch (e) {
      console.error('Failed to save todos to localStorage', e)
    }
  }

  const $page = document.createElement('div')
  $target.appendChild($page)

  new Header({ $target: $page, text: 'Simple Todo List' })

  new TodoForm({
    $target: $page,
    onSubmit: (text) => {
      const newTodo = {
        id: Date.now(),
        text,
      }
      const nextState = { ...this.state, todos: [...this.state.todos, newTodo] }
      this.setState(nextState)
    },
  })

  const todoList = new TodoList({
    $target: $page,
    initialState: this.state.todos,
    onDelete: (id) => {
      const newTodos = this.state.todos.filter((todo) => todo.id !== id)
      const nextState = { ...this.state, todos: newTodos }
      this.setState(nextState)
    },
    onEdit: (id, newText) => {
      const newTodos = this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
      const nextState = { ...this.state, todos: newTodos }
      this.setState(nextState)
    },
  })
}

export default App
