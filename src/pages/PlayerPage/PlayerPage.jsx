import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getAllHeroes, getPlayerData } from "../../api/deadlockApi"


const PlayerPage = () => {

  const [steamID, setSteamID] = useState("76561198876250039")
  const [playerData, setPlayerData] = useState([])
  const [heroesData, setHeroesData] = useState([])

  useEffect(() => {
    getAllHeroes().then(data => setHeroesData(data))
  }, []);

  async function handleClick() {
    const data = await getPlayerData(steamID)
    setPlayerData(data ?? [])
  }

  return (
    <div className={styles.container}>

      <div className={styles.inputs}>
        <label htmlFor="steamID">Enter steamID</label>
        <input type="text" name="steamID" id="steamID" onChange={(e) => setSteamID(e.target.value)} />
        <button onClick={() => handleClick()}>get Data!</button>
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

export default PlayerPage