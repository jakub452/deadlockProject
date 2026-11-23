import React from 'react'
import { useNavigate } from 'react-router'
import styles from './MateCard.module.css'
import { ExternalLink } from 'lucide-react';

const MateCard = ({ mate }) => {
    const navigate = useNavigate();


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <button className={styles.profileButton} onClick={() => { navigate(`/profile/${mate.profileID}`) }}>
                    <img className={styles.profileIcon} src={mate.avatarURL} alt={`${mate.name}'s avatar`} />
                    <p>{mate.name} <ExternalLink size={10} strokeWidth={1} /></p>
                </button>
            </div>
            <div className={styles.right}>
                <p>{mate.played}</p>
                <p>{mate.wins}</p>
                <p>{mate.winratio}</p>
            </div>
        </div>
    )
}

export default MateCard