import styles from './MatchCard.module.css'
import formatMatch from './utils/formatMatch'

const MatchCard = ({ match, heroesData, itemsData }) => {
    const m = formatMatch(match, heroesData, itemsData)

    return (
        <div className={`${styles.container} ${styles[m.result]}`}>

            <div className={styles.infoWrapper}>
                <div className={styles.matchText}>
                    <div className={styles.matchInfo}>
                        <p className={`${styles.matchResult} ${m.result === "Win" ? styles.winText : styles.loseText}`}>{m.result}</p>
                        <p className={styles.matchMode}>{m.mode}</p>
                    </div>
                    <div className={styles.matchTime}>
                        <p className={styles.matchTimeSince}>{m.timeSince}</p>
                        <p className={styles.matchDuration}>{m.duration}</p>
                    </div>
                </div>
                <div className={styles.matchHero}>
                    <img src={m.hero.icon} alt={m.hero.name} className={styles.heroIcon} title={m.hero.name} />
                </div>
                <div className={styles.matchKda}>
                    <p className={styles.matchKdaStats}>{m.kills} / <span className={styles.deaths}>{m.deaths}</span> / {m.assists}</p>
                    <p className={styles.matchKdaCalc}>{m.kda}</p>
                </div>
                <div className={styles.matchStats}>
                    <div className={styles.matchStatsSouls}>
                        <p>
                            <img src="https://cdn.deadlock.wiki/thumb/Souls.png/14px-Souls.png" alt="souls" />
                        </p>
                        <p>{m.souls}</p>
                    </div>
                </div>
            </div>
            <div className={styles.itemList}>
                {
                    m.items.map(item => (
                        <div className={`${styles.item} ${styles[item?.item_slot_type]}`}>
                            {item && <img src={item?.shop_image_webp} alt={item?.name} className={styles.itemImg}/>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MatchCard