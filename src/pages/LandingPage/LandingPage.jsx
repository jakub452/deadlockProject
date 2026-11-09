import styles from './LandingPage.module.css'
import SearchBar from '../../components/Navbar/SearchBar'
import logo from '../../assets/logo/lockstats-logo-jasny-tekst.svg'

const LandingPage = () => {
  return (
    <main className={styles.hero}>
        <div className={styles.title}>
            <img src={logo} alt="website logo" className={styles.logo} />
        </div>
        <div className={styles.wrapper}>
            <SearchBar />
        </div>
    </main>
  )
}

export default LandingPage