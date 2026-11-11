import styles from './ProfileHead.module.css'
import SteamSVG from './SteamSVG'

const ProfileHead = ({ profileId, name, avatarUrl, steamUrl }) => {

    return (
        <div className={styles.container}>
            <img className={styles.avatar} src={avatarUrl} alt={`${name}'s avatar`} />
            <div className={styles.profileText}>
                <h1 className={styles.profileName}>{name}</h1>
                <div className={styles.profileId}>
                    <p>id: {profileId}</p>
                    <SteamSVG />
                </div>

            </div>
        </div>
    )
}

export default ProfileHead