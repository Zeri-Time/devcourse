function ChildComponent({
  name,
  age,
  message,
  isLoggedIn,
  items,
  userInfo,
  onButtonClick,
}) {
  return (
    <div style={{ border: '1px solid gray', padding: '15px', margin: '10px' }}>
      <h3>자식 컴포넌트</h3>
      <p>전달받은 메시지: **{message}**</p>
      <p>이름: **{name}**</p>
      <p>나이: **{age}**</p>
      <p>로그인 상태: **{isLoggedIn ? '로그인 됨' : '로그아웃'}**</p>
      <p>아이템 목록: {items.join(', ')}</p>
      <p>사용자 이메일: {userInfo.email}</p>
      {/* 부모로부터 전달받은 함수 실행 */}
      <button onClick={onButtonClick}>부모 컴포넌트 알림</button>
    </div>
  )
}

export default ChildComponent
