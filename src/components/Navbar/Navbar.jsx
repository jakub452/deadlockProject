import styles from './Navbar.module.css'
import logo from '../../assets/logo/lockstats-logo-jasny-tekst.svg'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.navbar}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <img 
                        src={logo} 
                        alt="LockStats" 
                        className={styles.logo} 
                        onClick={() => {navigate('/')}}
                    />
                    <nav>
                        <ul className={styles.navbarList}>
                            <li className={styles.navbarListElement}><a className={styles.navbarLink} href="#">Stats</a></li>
                            <li className={styles.navbarListElement}><a className={styles.navbarLink} href="#">Heroes</a></li>
                            <li className={styles.navbarListElement}><a className={styles.navbarLink} href="#">Leaderboards</a></li>
                            <li className={styles.navbarListElement}><a className={styles.navbarLink} href="#">Builds</a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.right}>
                    <SearchBar />
                </div>
            </div>
        </header>
    )
}

export default Navbar