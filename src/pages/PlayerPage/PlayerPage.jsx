import { useEffect, useState } from "react"
import styles from './PlayerPage.module.css'
import { getPlayerSteamData, getPlayerRank, getRankData, getPlayerMatchHistoryData, getPlayerMatchHistoryMetadata, getAllHeroes, getItemsData } from "../../api/deadlockApi"
import { useParams } from "react-router"
import ProfileHead from "./components/ProfileHead/ProfileHead"
import MatchHistory from "./components/MatchHistory/MatchHistory"
import RankCard from "./components/RankCard/RankCard"
import Loading from "../Loading/Loading"

const PlayerPage = () => {
  const { id } = useParams()

  // TD: 
  // heroesdata and itemsdata cache on website beacuse its big request
  // fix methods for api fetching
  // load function in diferent place so it looks nice and readable
  // player individual hero data
  // winratio bar or circle with selecable seasons
  // better player searching
  // fix css so it doesnt look ugly

  const [playerSteamData, setPlayerSteamData] = useState([])
  const [playerRank, setPlayerRank] = useState([])
  const [rankData, setRankData] = useState([])
  const [playerMatchHistory, setPlayerMatchHistory] = useState([])
  const [matchMetadata, setMatchMetadata] = useState([])
  const [heroesData, setHeroesData] = useState([])
  const [itemsData, setItemsData] = useState([])
  const [loading, setLoading] = useState(false)


  async function load(id) {
    setLoading(true)
    try {
      const data = await getPlayerSteamData(id)
      setPlayerSteamData(data)

      const rank = await getPlayerRank(id)
      setPlayerRank(rank)

      const rankAsset = await getRankData(rank.rank)
      setRankData(rankAsset)

      const matchHistory = await getPlayerMatchHistoryData(id)
      setPlayerMatchHistory(matchHistory)

      const heroesData = await getAllHeroes()
      setHeroesData(heroesData)

      const playerMatchHistoryData = await getPlayerMatchHistoryData(id)
      const Ids = playerMatchHistoryData.slice(0, 10).map(match => match.match_id)
      const metadata = await getPlayerMatchHistoryMetadata(Ids, id)
      setMatchMetadata(metadata)

      const itemsData = await getItemsData()
      setItemsData(itemsData)

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
    <div className={styles.loading}>
      <Loading />
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.profileHead}>
        <ProfileHead
          profileId={playerSteamData[0]?.account_id}
          name={playerSteamData[0]?.personaname}
          avatarUrl={playerSteamData[0]?.avatarfull}
          steamUrl={playerSteamData[0]?.profileurl}
          playerMatchHistory={playerMatchHistory}
        />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft} >
          <RankCard rankData={rankData} playerRank={playerRank} playerMatchHistory={playerMatchHistory} />
        </div>
        <div className={styles.profileRight}>
          <MatchHistory id={playerSteamData[0]?.account_id} heroesData={heroesData} itemsData={itemsData} matchMetadata={matchMetadata} />
        </div>
      </div>
    </div>
  )

}

export default PlayerPage