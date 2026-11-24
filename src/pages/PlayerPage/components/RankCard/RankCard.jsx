import styles from './RankCard.module.css'

const RankCard = ({ rank }) => {


    return (
        <div className={styles.rankCard}>
            <div className={styles.rankIcon}>
                <img className={styles.icon} src={rank.icon} alt={`${rank.name} icon`} />
            </div>
            <div className={styles.rankInfo}>
                <p className={styles.rankName}>{rank.name} {rank.subrank}</p>
                <p>W/L: {rank.wins} / {rank.loses}</p>
                <p>{rank.winrate}</p>
            </div>
        </div>
    )
}

export default RankCard