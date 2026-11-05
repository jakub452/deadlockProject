import styles from './Navbar.module.css'
import logo from '../../assets/logo/lockstats-logo-jasny-tekst.svg'
import SearchBar from './SearchBar'

const Navbar = ({ onSearch }) => {
    return (
        <header className={styles.navbar}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <img src={logo} alt="LockStats" className={styles.logo} />
                    <nav>
                        <ul>
                            <li><a href="#">Statystyki</a></li>
                            <li><a href="#">Bohaterowie</a></li>
                            <li><a href="#">Rankingi</a></li>
                            <li><a href="#">Buildy</a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.right}>
                    <SearchBar onSearch={onSearch}/>
                </div>
            </div>
        </header>
    )
}

export default Navbar