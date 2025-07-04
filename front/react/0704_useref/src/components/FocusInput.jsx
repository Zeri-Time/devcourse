import { useRef } from 'react'

function FocusInput() {
  // input 요소에 접근하기 위한 ref를 생성.
  const inputRef = useRef(null)

  const handleClick = () => {
    // inputRef.current는 실제 DOM 요소에 대한 참조
    inputRef.current.focus() // focus() 메서드를 호출하여 input에 포커스를 줌
  }

  return (
    <div>
      <h2>Input 필드에 포커스 주기</h2>
      <input type="text" ref={inputRef} placeholder="여기에 포커스를 주세요" />
      <button onClick={handleClick}>포커스!</button>
    </div>
  )
}

export default FocusInput
