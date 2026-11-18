import styles from './MatchHistory.module.css'
import MatchCard from './MatchCard'


const MatchHistory = ({ heroesData, itemsData, matchMetadata }) => {
    return (
        <div className={styles.container}>
            {
                matchMetadata.slice(0, 20).map(match => (
                    <MatchCard match={match} key={match.match_id} heroesData={heroesData} itemsData={itemsData} />
                ))
            }
        </div>
    )
}

export default MatchHistory