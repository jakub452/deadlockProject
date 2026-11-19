import Navbar from './components/Navbar/Navbar.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { Routes, Route } from 'react-router';
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { fetchAssets } from './api/deadlockApi.js';

function App() {
  const [heroesData, setHeroesData] = useState([])
  const [itemsData, setItemsData] = useState([])
  const [ranksData, setRanksData] = useState([])

  async function load() {
    try {
      const fetchRes = await fetchAssets()
      setHeroesData(fetchRes.heroes)
      setItemsData(fetchRes.items)
      setRanksData(fetchRes.ranks)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    load()
  }, []);


  return (
    <div className={styles.main}>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile/:id' element={<PlayerPage heroesData={heroesData} itemsData={itemsData} ranksData={ranksData}/>} />
      </Routes>
    </div>
  )
}

export default App
