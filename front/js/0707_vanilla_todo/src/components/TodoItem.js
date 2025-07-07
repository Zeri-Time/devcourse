export default function TodoItem({ $target, id, text, onDelete, onEdit }) {
  const $item = document.createElement('li')
  $item.dataset.id = id
  $target.appendChild($item)

  this.render = () => {
    $item.innerHTML = `
      <span>${text}</span>
      <button class="delete-button">삭제</button>
    `
  }

  $item.addEventListener('click', (e) => {
    const target = e.target

    if (target.matches('.delete-button')) {
      onDelete(id)
      return
    }

    if (target.tagName === 'SPAN') {
      // 다른 항목이 수정 중일 때 새로운 수정을 방지하기 위해
      // TodoList의 $list가 아닌, 현재 $item 내부에 .edit-input이 있는지 확인합니다.
      if ($item.querySelector('.edit-input')) {
        return
      }

      const currentText = target.innerText

      const $input = document.createElement('input')
      $input.type = 'text'
      $input.className = 'edit-input'
      $input.value = currentText

      target.replaceWith($input)
      $input.focus()
      $input.select()

      const handleSave = () => {
        const newText = $input.value.trim()
        onEdit(id, newText || currentText)
      }

      $input.addEventListener('blur', handleSave)
      $input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSave()
        else if (e.key === 'Escape') this.render() // 수정 취소 시 원래대로 복구
      })
    }
  })

  this.render()
}
