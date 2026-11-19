import { useEffect, useState } from 'react'
import styles from './RankCard.module.css'

const RankCard = ({ ranks, player }) => {

    const [wins, setWins] = useState(0)
    const [loses, setLoses] = useState(0)
    const [winratio, setWinratio] = useState()

    const playerRank = ranks.find(r => r.tier === player.rank.rank)

    useEffect(() => {
        const seasonStart = Math.floor(new Date("2026-11-5").getTime() / 1000)
        const rankedsThisSeason = player.history
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
    }, [player]);

    return (
        <div className={`${styles.container} ${styles[playerRank?.name?.toLowerCase()] ?? ""}`}>
            <p className={styles.rankTitle}>Rank</p>
            <div className={styles.rankInfo}>
                <div className={styles.rankImgContainer}>
                    <img className={styles.rankImg} src={playerRank?.images?.[`large_subrank${player.rank.subrank}`] ?? playerRank?.images?.large} alt={playerRank?.name} />
                </div>
                <div className={styles.rankText}>
                    <p>{playerRank.name} {player.rank.subrank}</p>
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