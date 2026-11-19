import Navbar from './components/Navbar/Navbar.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { Routes, Route } from 'react-router';
import styles from './App.module.css'
import { useAssets } from './hooks/useAssets.js';
import Loading from './pages/Loading/Loading.jsx';

function App() {
  const { assets, isLoading, error } = useAssets()
  
  if(error) return (
    <div>Error has occurred: {error}</div>
  )

  if(isLoading) return (
    <Loading />
  )

  return (
    <div className={styles.main}>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile/:id' element={<PlayerPage assets={assets} />} />
      </Routes>
    </div>
  )
}

export default App
