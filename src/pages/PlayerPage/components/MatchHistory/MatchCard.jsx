import styles from './MatchCard.module.css'
import formatMatch from './utils/formatMatch'

const MatchCard = ({ match, heroesData, itemsData }) => {
    const m = formatMatch(match, heroesData, itemsData)


    return (
        <div className={`${styles.container} ${m.result === "Win" ? styles.win : styles.lose}`}>

            <div className={styles.matchText}>
                <p className={styles.matchResult}>{m.result}</p>
                <p className={styles.matchMode}>{m.mode}</p>
                <p className={styles.matchDuration}>{m.duration}</p>
            </div>
            <div className={styles.matchHero}>
                <div className={styles.heroIcon}><img src={m.hero.icon} alt={m.hero.name } /></div>
                <div className={styles.heroText}>
                    <p className={styles.heroName}>{m.hero.name}</p>
                </div>
            </div>
            <div className={styles.matchKda}>
                <p className={styles.matchKdaStats}>{m.kills} / {m.deaths} / {m.assists}</p>
                <p className={styles.matchKdaCalc}>{m.kda}</p>
            </div>
            <div className={styles.matchStats}>
                <div className={styles.matchStatsSouls}>
                    <p>Souls</p>
                    <p>{m.souls}</p>
                </div>
                <div className={styles.matchStatsAcuracy}>
                    <p>LH / DN</p>
                    <p>{m.lastHits} / {m.denies}</p>
                </div>
            </div>
            <div className={styles.itemList}>
                {
                    m.items.map(item => (
                        <div key={item?.id}>
                            <img src={item?.image} alt={item?.name} className={styles.item}/>
                            <p>{item?.name}</p>
                        </div>
                            
                    ))
                }
            </div>

        </div>
    )
}

export default MatchCard