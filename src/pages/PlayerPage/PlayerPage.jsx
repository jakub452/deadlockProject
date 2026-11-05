import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getAllHeroes } from "../../api/deadlockApi"


const PlayerPage = ({ playerData }) => {

  const [heroesData, setHeroesData] = useState([])

  useEffect(() => {
    getAllHeroes().then(data => setHeroesData(data))
  }, []);


  return (
    <div className={styles.container}>
      <p>przykladowe steamid: 76561198876250039</p>
      <table className={styles.heroTable}>
        <tbody>
          {playerData.map((element) => {
            const hero = heroesData.find((h) => h.id === element.hero_id)
            if(!hero) return
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