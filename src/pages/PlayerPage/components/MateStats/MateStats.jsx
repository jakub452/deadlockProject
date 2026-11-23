import MateCard from './MateCard'
import styles from './MateStats.module.css'

const MateStats = ({ mateStats }) => {
  return (
    <div className={styles.MateStatsCard}>
      <div className={styles.MateStatsCardTitle}>
        <div className={styles.left}>
          <p>name</p>
        </div>
        <div className={styles.right}>
          <p>games</p>
          <p>wins</p>
          <p>winratio</p>
        </div>
      </div>
      {
        mateStats.map(mate => (
          <MateCard mate={mate} />
        ))
      }
    </div>
  )
}

export default MateStats