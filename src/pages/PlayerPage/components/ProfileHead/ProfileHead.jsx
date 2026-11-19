import styles from './ProfileHead.module.css'
import SteamSVG from './SteamSVG'

const ProfileHead = ({ profile }) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img className={styles.avatar} src={profile.avatarUrl} alt={`${profile.name}'s avatar`} />
                <div className={styles.profileText}>
                    <h1 className={styles.profileName}>
                        {profile.name}
                    </h1>
                    <div className={styles.profileId}>
                        <p>id: {profile.profileID}</p>
                        <a href={profile.steamUrl} target='_blank' rel="noopener noreferrer" aria-label='Steam profile'><SteamSVG /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead