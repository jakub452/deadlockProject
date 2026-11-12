import styles from './MatchCard.module.css'
import formatMatch from './utils/formatMatch'

const MatchCard = ({ match, heroesData, itemsData }) => {
    const m = formatMatch(match, heroesData, itemsData)

    return (
        <div className={`${styles.container} ${styles[m.result]}`}>

            <div className={styles.infoWrapper}>
                <div className={styles.matchText}>
                        <p className={`${styles.matchResult} ${m.result === "Win" ? styles.winText : styles.loseText}`}>{m.result}</p>
                        <p className={styles.matchMode}>{m.mode}</p>
                        <p className={styles.matchTimeSince}>{m.timeSince} · {m.duration}</p>
                </div>
                <div className={styles.matchHero}>
                    <img src={m.hero.icon} alt={m.hero.name} className={styles.heroIcon} title={m.hero.name} />
                    <p className={styles.matchHeroName}>{m.hero.name}</p>
                </div>
                <div className={styles.matchKda}>
                    <p className={styles.matchKdaStats}>{m.kills} / <span className={styles.deaths}>{m.deaths}</span> / {m.assists}</p>
                    <p className={`${styles.matchKdaCalc} ${m.kda > 5 ? styles.gold : styles.undefined}`}>{m.kda} KDA</p>
                </div>
                <div className={styles.matchStats}>
                    <div className={styles.matchStatsSouls}>
                        <p>
                            <img src="https://cdn.deadlock.wiki/thumb/Souls.png/14px-Souls.png" alt="souls" />
                        </p>
                        <div>
                            <p>{m.souls}</p>
                            <p className={styles.matchStatsSoulsText}>souls</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.itemList}>
                {
                    m.items.map(item => (
                        <div className={`${styles.item} ${styles[item?.item_slot_type]}`}>
                            {item && <img src={item?.shop_image_webp} alt={item?.name} className={styles.itemImg} title={item?.name} />}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MatchCard