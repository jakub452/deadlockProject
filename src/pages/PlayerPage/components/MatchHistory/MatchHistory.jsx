import { useEffect, useState } from 'react'
import styles from './MatchHistory.module.css'
import { getAllHeroes, getPlayerMatchHistoryData } from '../../../../api/deadlockApi'
import MatchCard from './MatchCard'


const MatchHistory = ({ id }) => {
    
    const [matchHistoryData, setMatchHistoryData] = useState([])
    
    async function loadMatchHistoryData() {
        try {
            const data = await getPlayerMatchHistoryData(id)
            setMatchHistoryData(data)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        if (!id) {
            return
        }
        loadMatchHistoryData()

    }, [id]);


    const [heroesData, setHeroesData] = useState([])
    async function loadHeroesData() {
        try {
            const heroesData = await getAllHeroes()
            setHeroesData(heroesData)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        loadHeroesData()
    }, [])



    return (
        <div className={styles.container}>
            {
                matchHistoryData.slice(0, 20).map(match => (
                    <MatchCard match={match} key={match.match_id} heroesData={heroesData} />
                ))
            }
        </div>
    )
}

export default MatchHistory