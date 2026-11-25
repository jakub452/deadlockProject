import styles from './MatchDetails.module.css'
import soulsIcon from '../../../../assets/Souls.png'
const MatchDetails = ({ game, hidden }) => {
    // team0 = hidden king; team1 = archmother
    const team0 = game.players.filter(p => p.team === "Team0")
    const team1 = game.players.filter(p => p.team === "Team1")

    if(hidden){
        return ""
    }
    return (
        <div className={styles.matchDetails}>
            <div className={styles.team0}>
                {
                    team0.map(p => (
                        <div className={styles.matchPerson}>
                            <div className={styles.iconContainer}><img className={styles.icon} src={p.playerHero.icon} alt={`${p.playerHero.name}'s icon`} /></div>
                            <div className={styles.playerInfo}>
                                <p className={styles.playerName}>{p.name}</p>
                                <p className={styles.playerHero}>{`${p.playerHero.name} · level: ${p.playerHero.level}`}</p>
                                <p></p>
                            </div>
                            <div className={styles.kda}>
                                <p>{`${p.kills}/${p.deaths}/${p.assists}`}</p>
                                <p className={styles.kdaSub}>{p.kda}</p>
                            </div>
                            <div className={styles.souls}>
                                <img className={styles.soulsIcon} src={soulsIcon} alt="souls icon" />
                                <p>{p.souls}</p>
                            </div>
                            <div className={styles.performance}>
                                <p>{p.lastHits}/{p.denies}</p>
                            </div>
                            <div className={styles.items}>
                                {
                                    p.items.map((item, i) => (
                                        <img className={styles.itemIcon} src={item?.shop_image} alt={item?.name} title={item?.name} />
                                    ))
                                }
                            </div>
                            <div className={styles.damage}>
                                <p>{p.damage}</p>
                            </div>
                        </div>
                    ))

                }
            </div>
            <div className={styles.team1}>
                {
                    team1.map(p => (
                        <div className={styles.matchPerson}>
                            <div className={styles.iconContainer}><img className={styles.icon} src={p.playerHero.icon} alt={`${p.playerHero.name}'s icon`} /></div>
                            <div className={styles.playerInfo}>
                                <p className={styles.playerName}>{p.name}</p>
                                <p className={styles.playerHero}>{`${p.playerHero.name} · level: ${p.playerHero.level}`}</p>
                                <p></p>
                            </div>
                            <div className={styles.kda}>
                                <p>{`${p.kills}/${p.deaths}/${p.assists}`}</p>
                                <p className={styles.kdaSub}>{p.kda}</p>
                            </div>
                            <div className={styles.souls}>
                                <img className={styles.soulsIcon} src={soulsIcon} alt="souls icon" />
                                <p>{p.souls}</p>
                            </div>
                            <div className={styles.performance}>
                                <p>{p.lastHits}/{p.denies}</p>
                            </div>
                            <div className={styles.items}>
                                {
                                    p.items.map((item, i) => (
                                        <img className={styles.itemIcon} src={item?.shop_image} alt={item?.name} title={item?.name} />
                                    ))
                                }
                            </div>
                            <div className={styles.damage}>
                                <p>{p.damage}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MatchDetails