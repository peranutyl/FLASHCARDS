
import NavigationBar from './components/NavigationBar'
import CreateCards from './components/CreateCards'
import Revise from './components/Revise'
import {Routes, Route, Link} from 'react-router-dom'

function App() {

  return (
    <div>
    <NavigationBar></NavigationBar>
    <Routes>
      <Route path='/' element={<CreateCards/>}/>
      <Route path='/revise' element={<Revise></Revise>}/>
    </Routes>
    </div>

  )
}

export default App
