import './App.css';

function App () {
  return (
    <>
    <Naver />
    <TailWindTest />
    </>
  )
}
function Naver() {
  return(
    <a href='http://www.naver.com' target='_blank' title='네이버로 이동'>네이버</a>
  )
}
function TailWindTest() {
  return(
    <>
    <div className='text-3xl font-bold text-red-500'>
      Tailwind Test
    </div>
    </>
  )
}

export default App;
