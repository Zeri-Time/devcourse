import TodoItem from './TodoItem.js'

function TodoList({ $target, initialState, onDelete, onEdit }) {
  const $list = document.createElement('ul')
  $target.appendChild($list)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    // 렌더링 시 리스트를 비우고, 각 항목에 대해 TodoItem 인스턴스를 생성합니다.
    $list.innerHTML = ''
    this.state.forEach(({ id, text }) => {
      new TodoItem({
        $target: $list,
        id,
        text,
        onDelete,
        onEdit,
      })
    })
  }

  // 컴포넌트 생성 시 초기 렌더링을 실행합니다.
  this.render()
}

export default TodoList
