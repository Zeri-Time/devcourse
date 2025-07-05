import { useState } from 'react'

function Clock() {
  const [time, setTime] = useState(1)
  const handleOnClick = () => {
    let newTime
    if (time >= 12) {
      newTime = 1
    } else {
      newTime = time + 1
    }
    setTime(newTime)
  }
  return (
    <>
      <span className="mx-5">{time}</span>
      <button onClick={handleOnClick}>추가</button>
    </>
  )
}

export default Clock
