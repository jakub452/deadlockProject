import styles from './MatchCard.module.css'
import soulsIcon from '../../../../assets/Souls.png'
import MatchDetails from './MatchDetails'
import { useState } from 'react'
const MatchCard = ({ game }) => {
    const [hidden, setHidden] = useState(true)
    return (
        <button className={styles.wrapper} onClick={() => {setHidden(!hidden)}}>
            <div className={styles.matchCard}>
                <div className={styles.matchOutcome}>
                    <p>{game.gamemode}</p>
                    <p className={styles.matchOutcomeText}>{game.outcome}</p>
                    <p>{game.duration}</p>
                </div>
                <div className={styles.matchPerformance}>
                    <div className={styles.matchPerformanceIcon}>
                        <img src={game.playerHero.icon} className={`${styles.icon} ${styles.heroIcon}`} alt={`${game.playerHero.name}'s icon`} />
                        <p className={styles.heroLevel}>{game.level}</p>
                    </div>
                    <div className={styles.matchPerformanceStats}>
                        <p className={styles.heroName}>{game.playerHero.name}</p>
                        <p className={styles.textMuted}>{game.kda}</p>
                        <p className={styles.textMuted}>{`${game.kills} / ${game.deaths} / ${game.assists}`}</p>
                        <p className={styles.textMuted}>{game.timeSince}</p>
                    </div>
                </div>
                <div className={styles.matchEconomy}>
                    <div className={styles.souls}><img src={soulsIcon} alt="souls icon" className={styles.soulsIcon} />{game.networth}</div>
                    <div className={styles.souls}><img src={soulsIcon} alt="souls icon" className={styles.soulsIcon} />{game.soulspm}/min</div>
                    <div className={styles.souls}>{game.lasthits} LH</div>
                </div>
                <div className={styles.items}>
                    {
                        game.items.map((item, i) => (
                            <img className={styles.icon} src={item?.shop_image} alt={item?.name} title={item?.name} />
                        ))
                    }
                </div>
                <div className={styles.others}>
                    {
                        game.players.map(p => (
                            <img className={styles.icon} src={p.playerHero.icon} alt={`${p.playerHero.name}'s icon`} />
                        ))
                    }
                </div>
            </div>
            <MatchDetails game={game} hidden={hidden} />
        </button>
    )
}

export default MatchCard