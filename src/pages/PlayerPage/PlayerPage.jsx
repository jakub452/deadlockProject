import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getAllHeroes } from "../../api/deadlockApi"


const PlayerPage = ({ playerData, isLoading, hasError }) => {

  const [heroesData, setHeroesData] = useState([])

  useEffect(() => {
    getAllHeroes().then(data => setHeroesData(data))
  }, []);


  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  if (hasError) {
    return (
      <div>Wystąpił błąd podczas pobierania danych</div>
    )
  }

  return (
      <div className={styles.container}>
        <table className={styles.heroTable}>
          <tbody>
            {playerData.map((element) => {
              const hero = heroesData.find((h) => h.id === element.hero_id)
              if (!hero) return
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