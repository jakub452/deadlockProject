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
            <div className={styles.cardTitle}>
                <h1>Ranga</h1>
            </div>
            <div className={styles.cardRank}>
                <img 
                    className={styles.rankIcon} 
                    src={rankData?.images?.[`large_subrank${playerRank?.subrank}`] ?? rankData?.images?.large}
                />
                <div className={styles.rankText}>
                    <h1>{rankData.name} {playerRank.subrank}</h1>
                </div>
            </div>
            <div className={styles.cardWinratio}>
                <div></div>
            </div>
        </div>
    )
}

export default RankCard