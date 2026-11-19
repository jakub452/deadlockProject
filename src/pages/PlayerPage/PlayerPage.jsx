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


  if (error) return (
    <div>Error has occurred: {error}</div>
  )
  if (isLoading) return (
    <Loading />
  )



  return (
    <div className={styles.container}>
      <div className={styles.profileHead}>
        <ProfileHead profile={player.profile} />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft} >
          <RankCard ranks={ranks} player={player} />
        </div>
        <div className={styles.profileRight}>
          <MatchHistory heroes={heroes} items={items} matches={player.matches} />
        </div>
      </div>
    </div>
  )

}

export default PlayerPage