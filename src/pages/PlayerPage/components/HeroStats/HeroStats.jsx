import HeroCard from './HeroCard'
import styles from './HeroStats.module.css'

const HeroStats = ({ heroStats }) => {
    return (
        <div className={styles.HeroStatsCard}>
            <div className={styles.HeroStatsCardTitle}>
                <div className={styles.left}>
                    <p>name</p>
                </div>
                <div className={styles.right}>
                    <p>matches</p>
                    <p>winratio</p>
                    <p>kda</p>
                    <p>mvp</p>
                </div>
            </div>
            {
                heroStats.map(hero => (
                    <HeroCard hero={hero} />
                ))
            }
        </div>
    )
}

export default HeroStats