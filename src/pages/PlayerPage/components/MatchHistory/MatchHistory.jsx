import { useEffect, useState } from 'react'
import styles from './MatchHistory.module.css'
import { getAllHeroes, getPlayerMatchHistoryData } from '../../../../api/deadlockApi'
import MatchCard from './MatchCard'


const MatchHistory = ({ id }) => {
    const [matchHistory, setMatchHistory] = useState([])
    const [heroesData, setHeroesData] = useState([])

    async function load() {
        try {
            const data = await getPlayerMatchHistoryData(id)
            const heroesData = await getAllHeroes()
            setHeroesData(heroesData)
            setMatchHistory(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if(!id){
            return
        }
        load()
    }, [id]);

    return (
        <>
            {
                matchHistory.slice(0,10).map(match => (
                    <MatchCard match={match} key={match.match_id} heroesData={heroesData} />
                ))
            }
        </>
    )
}

export default MatchHistory