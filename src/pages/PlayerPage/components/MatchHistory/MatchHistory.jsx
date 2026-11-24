import styles from './MatchHistory.module.css'
import MatchCard from './MatchCard'


const MatchHistory = ({ heroes, items, games }) => {
    return (
        games.map(game => (
            <MatchCard game={game} heroes={heroes} items={items} />
        ))
    )
}

export default MatchHistory