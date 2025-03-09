
import NavigationBar from './components/NavigationBar'
import CreateCards from './components/CreateCards'
import ReviseDecks from './components/ReviseDecks'
import CardsDisplay from './components/CardsDisplay'
import {Routes, Route, Link} from 'react-router-dom'
import { Box } from '@mui/material'

function App() {

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
      <Box gridColumn="span 2">
        <NavigationBar></NavigationBar>
      </Box>
      <Box gridColumn="span 10">
      <Routes>
        <Route path='/' element={<CreateCards/>}/>
        <Route path='/revise' element={<ReviseDecks></ReviseDecks>}/>
        <Route path="/revise/:id" element={<CardsDisplay></CardsDisplay>}/>
      </Routes>
      </Box>
    </Box>
  )
}

export default App
