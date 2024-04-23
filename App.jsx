import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";


import Play from './pages/Play.jsx'
import Learn from './pages/Learn'
import Watch from './pages/Watch'
import News from './pages/News'
import Social_Chats from './pages/Social_Chats'
import Table from './pages/Table'
import Shop from './pages/Shop'
import Register from './pages/Register'
import Log_in from './pages/Log_in'
import Log_out from './pages/Log_out'

import MenuAppBar from './components/MenuAppBar.jsx'



function App() {

  return (
    <Router>
      <MenuAppBar/>
      <Routes>
        <Route path="/Table"  element={<Table/>}/>
        <Route path="/Learn"  element={<Learn/>}/>
        <Route path="/Watch"  element={<Watch/>}/>
        <Route path="/News"  element={<News/>}/>
        <Route path='/Play'  element={<Play/>} />
        <Route path="/Shop"  element={<Shop/>}/>     
        <Route path="/Log-In"    element={<Log_in/>}/>
        <Route path="/Log-Out"    element={<Log_out/>}/>
        <Route path="/Register"    element={<Register/>}/>
        <Route path="/Social-Chats" element={<Social_Chats/>}/>
      </Routes>
    </Router>
  )
}

export default App
