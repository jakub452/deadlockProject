import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getPlayerSteamData,getPlayerRank, getRankData, getPlayerMatchHistoryData } from "../../api/deadlockApi"
import { useParams } from "react-router"
import ProfileHead from "./components/ProfileHead/ProfileHead"
import MatchHistory from "./components/MatchHistory/MatchHistory"
import RankCard from "./components/RankCard/RankCard"

const PlayerPage = () => {
  const { id } = useParams()

  const [playerSteamData, setPlayerSteamData] = useState([])
  const [playerRank, setPlayerRank] = useState([])
  const [rankData, setRankData] = useState([])
  const [playerMatchHistory, setPlayerMatchHistory] = useState([])

  async function load(id){
    try {
      const data = await getPlayerSteamData(id)
      setPlayerSteamData(data)

      const rank = await getPlayerRank(id)
      setPlayerRank(rank)

      const rankAsset = await getRankData(rank.rank)
      setRankData(rankAsset)
    
      const matchHistory = await getPlayerMatchHistoryData(id)
      setPlayerMatchHistory(matchHistory)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (!id) {
      return
    }
    load(id)
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={`${styles.profileHead} ${styles[rankData?.name?.toLowerCase()] ?? ""}`}>
        <ProfileHead
          profileId={playerSteamData[0]?.account_id}
          name={playerSteamData[0]?.personaname}
          avatarUrl={playerSteamData[0]?.avatarfull}
          steamUrl={playerSteamData[0]?.profileurl}
          playerMatchHistory={playerMatchHistory}          
        />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft}>
          <RankCard rankData={rankData} playerRank={playerRank} />
        </div>
        <div className={styles.profileRight}>
          <MatchHistory id={playerSteamData[0]?.account_id} />
        </div>
      </div>
    </div>
  )

}

export default PlayerPage