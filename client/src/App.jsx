import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
