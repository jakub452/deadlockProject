import styles from './ProfileHead.module.css'

const ProfileHead = ({ profileId, name, avatarUrl }) => {

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
                    <button onClick={() => {console.log('refresh')}}>Odśwież</button>
                    <button>Gra na żywo</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead