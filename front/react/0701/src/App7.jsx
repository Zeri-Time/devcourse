import './App.css'
import { useState } from 'react'

function App7() {
  const [texts, setTexts] = useState(['짱구', '맹구', '유리', '철수'])
  return (
    <>
      <ul>
        {texts.map((content, index) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
    </>
  )
}

export default App7
