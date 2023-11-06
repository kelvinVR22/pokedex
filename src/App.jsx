
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <div className='bg-[#FFFFFF] h-full'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/pokedex' element={<Pokedex />}/>
          <Route path='/pokedex/:pokemonId' element={<PokemonDetail />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
