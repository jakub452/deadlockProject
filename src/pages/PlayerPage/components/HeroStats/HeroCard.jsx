import React from 'react'
import styles from './HeroCard.module.css'
const HeroCard = ({ hero }) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={hero.icon} alt={`${hero.name}'s icon`} className={styles.heroIcon} />
                <p>{hero.name}</p>
            </div>
            <div className={styles.right}>
                <p>{hero.matches}</p>
                <p>{hero.winratio}</p>
                <p>{hero.kda}</p>
                <p>{hero.mvp}</p>
            </div>
        </div>
    )
}

export default HeroCard