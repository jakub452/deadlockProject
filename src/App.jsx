import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import styles from './App.module.css'

function App() {

  const [steamID, setSteamID] = useState("")
  const [playerData, setPlayerData] = useState([])
  const [heroesData, setHeroesData] = useState([])

  async function getData(steamID) {
    const url = `https://api.deadlock-api.com/v1/players/hero-stats?account_ids=${steamID}&game_mode=normal`
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
      }
      const result = await res.json();
      setPlayerData(result)
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getHeroes() {
    const url = `https://api.deadlock-api.com/v1/assets/heroes/`
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
      }
      const result = await res.json()
      setHeroesData(result)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getHeroes()
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <label htmlFor="steamID">Enter steamID</label>
        <input type="text" name="steamID" id="steamID" onChange={(e) => setSteamID(e.target.value)} />
        <button onClick={() => getData(steamID)}>get Data!</button>
        <button onClick={() => console.log(playerData)}>console.log(playerData)</button>
      </div>
      <table className={styles.heroTable}>
        <tbody>
          {playerData.map((element) => {
            const hero = heroesData.find((h) => h.id === element.hero_id)
            return (
              <tr key={element.hero_id}>
                <td><img src={hero.images.icon_hero_card} alt={hero.name} className={styles.heroIcon} /></td>
                <td>{hero.name}</td>
                <td>Games: {element.matches_played}</td>
                <td>Wins: {element.wins}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
