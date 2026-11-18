import Navbar from './components/Navbar/Navbar.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { Routes, Route } from 'react-router';
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { getAllHeroes, getItemsData } from './api/deadlockApi.js';
function App() {
  const [heroesData, setHeroesData] = useState([])
  const [itemsData, setItemsData] = useState([])
  useEffect(() => {
    async function load() {
      try {
        const heroesData = await getAllHeroes()
        setHeroesData(heroesData)
        const itemsData = await getItemsData()
        setItemsData(itemsData)
      } catch (err) {
        console.log(err.message)
      } finally {
        console.log(`downloaded: heroesData, itemsData`)
      }
    }
    load()
  }, []);
  return (
    <div className={styles.main}>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile/:id' element={<PlayerPage heroesData={heroesData} itemsData={itemsData} />} />
      </Routes>
    </div>
  )
}

export default App
