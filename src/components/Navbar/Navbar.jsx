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
                        <ul>
                            <li><a href="#">Stats</a></li>
                            <li><a href="#">Heroes</a></li>
                            <li><a href="#">Leaderboards</a></li>
                            <li><a href="#">Builds</a></li>
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