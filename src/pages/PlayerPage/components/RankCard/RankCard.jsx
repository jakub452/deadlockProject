import { useEffect, useState } from 'react'
import styles from './RankCard.module.css'
import { getPlayerRank, getRankData } from '../../../../api/deadlockApi'

const RankCard = ({ id }) => {

    const [playerRank, setPlayerRank] = useState([])
    const [rankData, setRankData] = useState([])

    useEffect(() => {
        if (!id) {
            return
        }
        async function load(id) {
            try {
                const rank = await getPlayerRank(id)
                setPlayerRank(rank)

                const rankAsset = await getRankData(rank.rank)
                setRankData(rankAsset)
            } catch (err) {
                console.log(err.message)
            }
        }

        load(id)
    }, [id])

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