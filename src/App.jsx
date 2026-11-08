import Navbar from './components/Navbar/Navbar.jsx'
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { Routes, Route } from 'react-router';

function App() {




  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<p>wyszukaj gracza</p>} />
        <Route path='/profile/:id' element={<PlayerPage />} />
      </Routes>
    </div>

  )
}

export default App
