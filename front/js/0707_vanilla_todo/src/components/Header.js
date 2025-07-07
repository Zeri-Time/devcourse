function Header({ $target, text }) {
  const $header = document.createElement('h1')
  $target.appendChild($header)

  // App.js에서 받은 text를 초기 state로 설정합니다.
  this.state = text

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
    $header.textContent = this.state
  }
  this.render()
}

export default Header
