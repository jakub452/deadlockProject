import styles from './ProfileHead.module.css'
import SteamSVG from './SteamSVG'

const ProfileHead = ({ playerData }) => {
    
    const formatPlayer = {
        "name": playerData[0].personaname,
        "profileID": playerData[0].account_id,
        "steamUrl": playerData[0].profileurl,
        "avatarUrl": playerData[0].avatarfull
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img className={styles.avatar} src={formatPlayer.avatarUrl} alt={`${formatPlayer.name}'s avatar`} />
                <div className={styles.profileText}>
                    <h1 className={styles.profileName}>
                        {formatPlayer.name}
                    </h1>
                    <div className={styles.profileId}>
                        <p>id: {formatPlayer.profileID}</p>
                        <a href={formatPlayer.steamUrl} target='_blank' rel="noopener noreferrer" aria-label='Steam profile'><SteamSVG /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead