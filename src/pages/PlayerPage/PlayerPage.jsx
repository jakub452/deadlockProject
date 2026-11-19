import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getPlayerSteamData, getPlayerRank, getRankData, getPlayerMatchHistoryData, getPlayerMatchHistoryMetadata } from "../../api/deadlockApi"
import { useParams } from "react-router"
import ProfileHead from "./components/ProfileHead/ProfileHead"
import MatchHistory from "./components/MatchHistory/MatchHistory"
import RankCard from "./components/RankCard/RankCard"
import Loading from "../Loading/Loading"

const PlayerPage = ({ assets }) => {
  const { id } = useParams()
  const { heroes, items, ranks } = assets

  // TD: 
  // heroesdata and itemsdata cache on website beacuse its big request
  // fix methods for api fetching
  // load function in diferent place so it looks nice and readable
  // player individual hero data
  // winratio bar or circle with selecable seasons
  // better player searching
  // fix css so it doesnt look ugly

  const [playerRank, setPlayerRank] = useState([])
  const [rankData, setRankData] = useState([])
  const [playerMatchHistory, setPlayerMatchHistory] = useState([])
  const [matchMetadata, setMatchMetadata] = useState([])

  const [playerData, setPlayerData] = useState([])

  const [loading, setLoading] = useState(true)


  async function load(id) {
    setLoading(true)
    try {
      const playerData = await getPlayerSteamData(id)
      setPlayerData(playerData)

      const rank = await getPlayerRank(id)
      setPlayerRank(rank)

      const rankAsset = await getRankData(rank.rank)
      setRankData(rankAsset)

      const matchHistory = await getPlayerMatchHistoryData(id)
      setPlayerMatchHistory(matchHistory)

      const playerMatchHistoryData = await getPlayerMatchHistoryData(id)
      const Ids = playerMatchHistoryData.slice(0, 10).map(match => match.match_id)
      const metadata = await getPlayerMatchHistoryMetadata(Ids, id)
      setMatchMetadata(metadata)



    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) {
      return
    }
    load(id)
  }, [id]);

  if (loading) return (
    <Loading />
  )

  return (
    <div className={styles.container}>
      <div className={styles.profileHead}>
        <ProfileHead playerData={playerData} />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft} >
          <RankCard rankData={rankData} playerRank={playerRank} playerMatchHistory={playerMatchHistory} />
        </div>
        <div className={styles.profileRight}>
          <MatchHistory heroesData={heroes} itemsData={items} matchMetadata={matchMetadata} />
        </div>
      </div>
    </div>
  )

}

export default PlayerPage