import styles from './MatchHistory.module.css'
import MatchCard from './MatchCard'


const MatchHistory = ({ heroes, items, matches }) => {
    return (
        <div className={styles.container}>
            {
                matches.map(match => (
                    <MatchCard match={match} key={match.match_id} heroes={heroes} items={items} />
                ))
            }
        </div>
    )
}

export default MatchHistory