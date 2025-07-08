import NameList4 from '../components/NameList4'
function Name4() {
  // 페이지 레벨에서 사용할 초기 데이터를 정의합니다.
  const namesForPage4 = [
    { id: 1, value: '짱구' },
    { id: 2, value: '짱아' },
    { id: 3, value: '맹구' },
    { id: 4, value: '철수' },
  ] // 이렇게 하면 어떤 페이지에서든 다른 초기 데이터를 받아서 재사용 할 수 있음
  return (
    <>
      <div>
        <h1>Name4 페이지</h1>
        {/* 이제 Name4 페이지는 NameList4 컴포넌트를 재사용합니다. */}
        <NameList4 initialNames={namesForPage4} />
      </div>
    </>
  )
}

export default Name4
