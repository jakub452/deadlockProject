import styles from './LandingPage.module.css'
import SearchBar from '../../components/Navbar/SearchBar'
import logo from '../../assets/logo/lockstats-logo-jasny-tekst.svg'
const LandingPage = () => {
  return (
    <main className={styles.hero}>
        <div className={styles.title}>
            <img src={logo} alt="website logo" className={styles.logo} />
            <p>historia meczy, ranga, najlepi bohaterowie i szczegółowe statystyki - wpisz steamID</p>
        </div>
        <div className={styles.wrapper}>
            <SearchBar />
        </div>
        <div>Przykładowe profile: 76561198876250039; 76561199487617891</div>
    </main>
  )
}

export default LandingPage