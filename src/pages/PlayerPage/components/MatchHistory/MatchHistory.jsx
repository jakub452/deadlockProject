import { useEffect, useState } from 'react'
import styles from './MatchHistory.module.css'
import { getAllHeroes, getItemsData, getPlayerMatchHistoryData, getPlayerMatchHistoryMetadata } from '../../../../api/deadlockApi'
import MatchCard from './MatchCard'


const MatchHistory = ({ id }) => {

    const [matchMetadata, setMatchMetadata] = useState([])

    async function loadMatchHistoryData() {
        try {
            const data = await getPlayerMatchHistoryData(id)
            const Ids = data.slice(0,20).map(match => match.match_id)            
            const metadata = await getPlayerMatchHistoryMetadata(Ids, id)
            setMatchMetadata(metadata)

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
    const [itemsData, setItemsData] = useState([])
    async function loadAssetData() {
        try {
            const heroesData = await getAllHeroes()
            setHeroesData(heroesData)

            const itemsData = await getItemsData()
            setItemsData(itemsData)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        loadAssetData()
    }, [])



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