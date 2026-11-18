import { useEffect, useState } from 'react'
import styles from './RankCard.module.css'

const RankCard = ({ rankData, playerRank, playerMatchHistory }) => {

    const [wins, setWins] = useState(null)
    const [loses, setLoses] = useState(null)
    const [winratio, setWinratio] = useState()

    useEffect(() => {
        const seasonStart = Math.floor(new Date("2026-11-5").getTime() / 1000)
        const rankedsThisSeason = playerMatchHistory
            .filter(m => m?.match_mode === 4)
            .filter(m => m?.start_time >= seasonStart)

        const wins = rankedsThisSeason
            .filter(m => m?.player_match_outcome === 1)
        const loses = rankedsThisSeason
            .filter(m => m?.player_match_outcome === 2)
        const winratio = (wins.length / (wins.length+loses.length)*100)

        if(!winratio > 0){
            setWinratio(0)
        } else {
            setWinratio(winratio.toFixed(2))
        }

        setWins(wins.length)
        setLoses(loses.length)
    }, [playerMatchHistory]);

    return (
        <div className={`${styles.container} ${styles[rankData?.name?.toLowerCase()] ?? ""}`}>
            <p className={styles.rankTitle}>Rank</p>
            <div className={styles.rankInfo}>
                <div className={styles.rankImgContainer}>
                    <img className={styles.rankImg} src={rankData?.images?.[`large_subrank${playerRank?.subrank}`] ?? rankData?.images?.small} alt={rankData.name} />
                </div>
                <div className={styles.rankText}>
                    <p>{rankData.name} {playerRank.subrank}</p>
                    <div className={styles.progressBar}>
                        <p>W/L: {wins} / {loses}</p>
                        <p>win rate: {winratio}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RankCard