import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getAllHeroes, getPlayerData } from "../../api/deadlockApi"
import { useParams } from "react-router"

const PlayerPage = () => {
  const { id } = useParams()
  const [heroesData, setHeroesData] = useState([])


  const [playerData, setPlayerData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  async function load() {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getPlayerData(id)
      setPlayerData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getAllHeroes().then(data => setHeroesData(data))
  }, []);


  useEffect(() => {
    if (!id) {
      return
    } else {
      load()
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.status}>Loading</div>
    )
  }

  if (error) {
    return (
      <div className={styles.status}>Wystąpił błąd: {error}</div>
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