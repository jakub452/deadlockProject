import Navbar from './components/Navbar/Navbar.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { Routes, Route } from 'react-router';

function App() {




  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile/:id' element={<PlayerPage />} />
      </Routes>
    </>
  )
}

export default App
