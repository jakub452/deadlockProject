import styles from './RankCard.module.css'

const RankCard = ({ rankData, playerRank }) => {
    return (
        <div className={styles.container}>
            <p className={styles.rankTitle}>Rank</p>
            <div className={styles.rankInfo}>
                <img className={styles.rankImg} src={rankData?.images?.[`large_subrank${playerRank?.subrank}`] ?? rankData?.images?.small} alt={rankData.name} />
                <div className={styles.rankText}>
                    <p>{rankData.name} {playerRank.subrank}</p>
                </div>
            </div>
        </div>
    )
}

export default RankCard