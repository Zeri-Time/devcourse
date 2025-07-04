import ChildComponent from './component/ChildComponent'

function App() {
  const userName = '테스트'
  const userAge = 30
  const greetingMessage = '안녕!'

  const handleClick = () => {
    console.log('버튼 눌렀음')
  }
  return (
    <div>
      <h1>부모 컴포넌트</h1>
      {/* ChildComponent에 props 전달 */}
      <ChildComponent
        name={userName} // 문자열 전달
        age={userAge} // 숫자 전달
        message={greetingMessage} // 문자열 전달
        isLoggedIn={true} // 불리언 전달
        items={['사과', '바나나', '체리']} // 배열 전달
        userInfo={{ email: 'react@example.com', phone: '010-1234-5678' }} // 객체 전달
        onButtonClick={handleClick} // 함수 전달
      />
    </div>
  )
}

export default App
