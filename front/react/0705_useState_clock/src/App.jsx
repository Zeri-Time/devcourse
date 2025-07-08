import Clock from './components/clock'
import NameList from './components/NameList'
import NameList2 from './components/NameList2'
import NameList3 from './components/NameList3'
import NameList4 from './components/NameList4'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Sub from './pages/Sub'
import Name4 from './pages/Name4'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}></Route>
        <Route path="/sub" element={<Sub />}></Route>
        <Route path="/name4" element={<Name4 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
