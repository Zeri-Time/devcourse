function TodoForm({ $target, onSubmit }) {
  const $form = document.createElement('form')
  $target.appendChild($form)

  $form.addEventListener('submit', (e) => {
    e.preventDefault()
    const $input = $form.querySelector('input')
    const text = $input.value

    if (text.length > 1) {
      onSubmit(text)
      $input.value = ''
      $input.focus()
    }
  })

  this.render = () => {
    $form.innerHTML = `<input type="text" placeholder="Enter a todo..." /> <button>Add</button>`
  }
  this.render()
}
export default TodoForm
