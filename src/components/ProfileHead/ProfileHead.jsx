import { useEffect, useState } from 'react'
import styles from './ProfileHead.module.css'
import icon from '../../assets/logo/lockstats-ikona.svg'
import { getPlayerSteamData } from '../../api/deadlockApi'

const ProfileHead = ({ id }) => {
    const [playerSteamData, setPlayerSteamData] = useState([]);

    const [profileId, setProfileId] = useState("");
    const [name, setName] = useState("")
    const [avatarUrl, setAvatarUrl] = useState(icon)

    async function loadPlayerSteamData() {
        console.log('getting data')

        try {
            const data = await getPlayerSteamData(id)
            setPlayerSteamData(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (!id) {
            return
        } else {
            loadPlayerSteamData()
        }
    }, [id]);

    useEffect(() => {
        setAvatarUrl(playerSteamData[0]?.avatarfull)
        setName(playerSteamData[0]?.personaname)
        setProfileId(playerSteamData[0]?.account_id)
    }, [playerSteamData]);


    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img src={avatarUrl} alt="steam avatar" className={styles.iconIMG} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <h1 className={styles.name}>{name}</h1>
                    <h2>
                        <span className={styles.subtext}>id: {profileId}</span>
                    </h2>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => {loadPlayerSteamData()}}>Odśwież</button>
                    <button>Gra na żywo</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead