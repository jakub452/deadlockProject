import styles from './PlayerPage.module.css'
import { useParams } from "react-router"
import ProfileHead from "./components/ProfileHead/ProfileHead"
import MatchHistory from "./components/MatchHistory/MatchHistory"
import RankCard from "./components/RankCard/RankCard"
import Loading from "../Loading/Loading"
import { usePlayer } from "../../hooks/usePlayer"

const PlayerPage = ({ assets }) => {
  const { id } = useParams()
  const { heroes, items, ranks } = assets
  const { player, isLoading, error } = usePlayer(id)

  
  if(error) return (
    <div>Wystąpił błąd {error}</div>
  )
  if (isLoading) return (
    <Loading />
  )
  
  const rankData = ranks.find(r => r.tier === player.rank.rank)

  return (
    <div className={styles.container}>
      <div className={styles.profileHead}>
        <ProfileHead profile={player.profile} />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft} >
          <RankCard rankData={rankData} playerRank={player.rank} playerMatchHistory={player.history} />
        </div>
        <div className={styles.profileRight}>
          <MatchHistory heroesData={heroes} itemsData={items} matchMetadata={player.matches} />
        </div>
      </div>
    </div>
  )

}

export default PlayerPage