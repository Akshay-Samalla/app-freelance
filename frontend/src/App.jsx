import  Login  from './components/Login.jsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Notauth from './components/Notauth'
import Hi from './components/Hi.jsx'
import { useState } from 'react'
import Profile from './components/Profile.jsx'
function App() { 
  const [isauth,setauth] = useState(false)
  const [uid , setuid] = useState(null) 
  const [role, setrole] = useState('dev')


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setauth = {setauth} setuid = {setuid}  setrole = {setrole}/>}/>
        <Route path="/signup" element={<Signup setauth = {setauth} setuid = {setuid} setrole = {setrole}/>}/>
        <Route path= "/hi" element={   isauth ? <Hi uid = {uid} role = {role}/> : <Notauth/>}/>
        <Route path='/profile' element={<Profile uid={ uid }/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
