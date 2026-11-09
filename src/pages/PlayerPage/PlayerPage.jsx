import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getPlayerSteamData } from "../../api/deadlockApi"
import { useParams } from "react-router"
import ProfileHead from "./components/ProfileHead/ProfileHead"
import MatchHistory from "./components/MatchHistory/MatchHistory"
import RankCard from "./components/RankCard/RankCard"

const PlayerPage = () => {
  const { id } = useParams()

  const [playerSteamData, setPlayerSteamData] = useState([])


  async function loadPlayerSteamData() {
    try {
      const data = await getPlayerSteamData(id)
      setPlayerSteamData(data)
    } catch (err) {
      console.log(err.message)
    }
  }


  useEffect(() => {
    if (!id) {
      return
    }

    loadPlayerSteamData()
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.profileHead}>
        <ProfileHead
          profileId={playerSteamData[0]?.account_id}
          name={playerSteamData[0]?.personaname}
          avatarUrl={playerSteamData[0]?.avatarfull}
        />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft}>
          <RankCard id={playerSteamData[0]?.account_id}/>
          <div>Statystyki bohatera</div>
        </div>
        <div className={styles.profileRight}>
          <MatchHistory id={playerSteamData[0]?.account_id} />
        </div>
      </div>
    </div>
  )

}

export default PlayerPage