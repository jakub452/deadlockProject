import styles from './ProfileHead.module.css'
import SteamSVG from './SteamSVG'

const ProfileHead = ({ profileId, name, avatarUrl, steamUrl }) => {
    
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img src={avatarUrl} alt="steam avatar" className={styles.iconIMG} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <h1 className={styles.name}>{name}</h1>
                    <h2 className={styles.subtextContainer}>
                        <span className={styles.subtext}>id: {profileId}</span>
                        <span className={styles.steamProfile}>
                            <a href={steamUrl} rel="noopener noreferrer" target='_blank'>
                                <SteamSVG />
                            </a>
                        </span>
                    </h2>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.profileHeadButton} onClick={() => { console.log('refresh') }}>Odśwież</button>
                    <button className={styles.profileHeadButton}>Gra na żywo</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead