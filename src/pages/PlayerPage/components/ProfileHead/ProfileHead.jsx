import { useEffect, useState } from 'react'
import styles from './ProfileHead.module.css'
import SteamSVG from './SteamSVG'

const ProfileHead = ({ profileId, name, avatarUrl, steamUrl, playerMatchHistory }) => {

    const [wins, setWins] = useState(null)
    const [loses, setLoses] = useState(null)
    const [winratio, setWinratio] = useState(null)

    useEffect(() => {
        // Thursday March 11th 2027
        const seasonStart = Math.floor(new Date("2026-11-5").getTime() / 1000)
        const rankedsThisSeason = playerMatchHistory
            .filter(m => m?.match_mode === 4)
            .filter(m => m?.start_time >= seasonStart)

        const wins = rankedsThisSeason
            .filter(m => m?.player_match_outcome === 1)
        const loses = rankedsThisSeason
            .filter(m => m?.player_match_outcome === 2)
        const winratio = (wins.length / (wins.length+loses.length)*100)

        setWinratio(winratio)
        setWins(wins.length)
        setLoses(loses.length)
    }, [playerMatchHistory]);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img className={styles.avatar} src={avatarUrl} alt={`${name}'s avatar`} />
                <div className={styles.profileText}>
                    <h1 className={styles.profileName}>{name}</h1>
                    <div className={styles.profileId}>
                        <p>id: {profileId}</p>
                        <a href={steamUrl} target='_blank' rel="noopener noreferrer" aria-label='Steam profile'><SteamSVG /></a>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <p>{`${winratio}%`}</p>
                <p>{`${wins} / ${loses}`}</p>
            </div>
        </div>
    )
}

export default ProfileHead