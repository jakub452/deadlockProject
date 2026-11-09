import { useEffect, useState } from 'react'
import { getMatchMetadata } from '../../../../api/deadlockApi'
import styles from './MatchCard.module.css'

const MatchCard = ({ match, heroesData }) => {

    const [matchMetadata, setMatchMetadata] = useState(null)

    const matchModes = { 
        1: "Normal",
        4: "Ranked"
    }

    function formatDuration(s) {
        const min = Math.floor(s/60)
        const sec = s%60
        return `${min}:${String(sec).padStart(2,"0")}`
    }

    function formatMatch(match, matchMetadata) {
        const hero = heroesData.find(hero => hero.id === match.hero_id)
        return {
            result: match.player_match_outcome === 1? "win" : "lose",
            mode: matchModes[match.match_mode],
            duration: formatDuration(match.match_duration_s),
            hero: {
                name: hero?.name,
                icon: hero?.images?.icon_image_small
            },
            kills: match.player_kills,
            deaths: match.player_deaths,
            assists: match.player_assists,
            kda: ((match.player_kills + match.player_assists) / match.player_deaths).toFixed(2),
            souls: match.net_worth,
            // damage: ,
            lastHits: match.last_hits,
            denies: match.denies,
            // items: ,


        }
    }
    const m = formatMatch(match, matchMetadata)
    async function load(id) {
        try {
            const data = await getMatchMetadata(id)
            setMatchMetadata(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if(!match){
            return
        }
        // load(match.match_id)
    }, [match]);


    return (
        <div className={`${styles.container} ${m.result === "win" ? styles.win : styles.lose}`}>
            <button className={styles.debugbutton} onClick={() => console.log(matchMetadata, match)}>DEBUG!</button>

            <div className={styles.matchText}>
                <p className={styles.matchResult}>{m.result}</p>
                <p className={styles.matchMode}>{m.mode}</p>
                <p className={styles.matchDuration}>{m.duration}</p>
            </div>
            <div className={styles.matchHero}>
                <div className={styles.heroIcon}><img src={m.hero.icon} alt={m.hero.name } /></div>
                <div className={styles.heroText}>
                    <p className={styles.heroName}>{m.hero.name}</p>
                </div>
            </div>
            <div className={styles.matchKda}>
                <p className={styles.matchKdaStats}>{m.kills} / {m.deaths} / {m.assists}</p>
                <p className={styles.matchKdaCalc}>{m.kda}</p>
            </div>
            <div className={styles.matchStats}>
                <div className={styles.matchStatsSouls}>
                    <p>Dusze</p>
                    <p>{m.souls}</p>
                </div>
                {/* <div className={styles.matchStatsDamage}></div> */}
                <div className={styles.matchStatsAcuracy}>
                    <p>LH/DN</p>
                    <p>{m.lastHits} / {m.denies}</p>
                </div>
            </div>

        </div>
    )
}

export default MatchCard