import { useEffect, useState } from 'react'
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue) // 일반 훅 사용
  const increment = () => setCount((prevCount) => prevCount + 1)
  const decrement = () => setCount((prevCount) => prevCount - 1)

  return { count, increment, decrement }
}

function CounterComponentA() {
  const { count, increment, decrement } = useCounter(10) // 커스텀 훅 사용
  return (
    <div>
      <h2>Counter A</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

function CounterComponentB() {
  const { count, increment } = useCounter(0) // 다른 컴포넌트에서 같은 커스텀 훅 사용
  return (
    <div>
      <h2>Counter B</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
