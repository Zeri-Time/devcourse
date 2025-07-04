import { useRef } from 'react'
import { useState } from 'react'
import FocusInput from './components/FocusInput'

function App() {
  // useState를 이용한 카운터: 값이 변경되면 컴포넌트가 리렌더링됩니다.
  const [stateCount, setStateCount] = useState(0)

  // useRef를 이용한 카운터: 값이 변경되어도 컴포넌트가 리렌더링되지 않습니다.
  const refCount = useRef(0)

  const incrementState = () => {
    setStateCount(stateCount + 1)
  }

  const incrementRef = () => {
    refCount.current = refCount.current + 1 // useRef의 값은 .current로 접근하고 변경합니다.
    console.log('refCount.current:', refCount.current) // 콘솔에서만 값이 증가하는 것을 확인할 수 있습니다.
  }
  return (
    <>
      <h2>useRef와 useState 비교</h2>

      <h3>useState 카운터</h3>
      <p>현재 값: {stateCount}</p>
      <button onClick={incrementState}>증가 (useState)</button>
      <p>* useState로 관리되는 값은 변경 시 UI가 업데이트됩니다.</p>

      <h3>useRef 카운터</h3>
      <p>현재 값: (콘솔 확인 - UI에 직접 표시되지 않음)</p>
      <button onClick={incrementRef}>증가 (useRef)</button>
      <p>
        * useRef로 관리되는 값은 변경되어도 UI가 업데이트되지 않습니다. <br />*
        주로 DOM 요소에 직접 접근하거나, 리렌더링과 관계없이 유지되어야 하는
        값을 저장할 때 사용됩니다.
      </p>
      <FocusInput />
    </>
  )
}

export default App
