import { useEffect, useState } from 'react'
import styles from './SearchBar.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router'
import { searchPlayer } from '../../api/deadlockApi.js'

const SearchBar = () => {
  const [inputData, setInputData] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputDataTrim = inputData.trim()
    if (!/^[0-9]{17}$/.test(inputDataTrim)) {
      alert('Nieprawidłowy steamID')
      return
    }
    navigate(`/profile/${inputDataTrim}`)
    setInputData("")
  }


  useEffect(() => {
    if (!inputData.trim()) {
      setSearchResult([])
      return
    }
    async function load() {
      const data = await searchPlayer(inputData)
      setSearchResult(data)
    }
    const debounce = setTimeout(() => {
      load()
    }, 400);

    return() => {
        clearTimeout(debounce)
    }
  }, [inputData]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {
        searchResult.length > 0 && (
          <div className={styles.searchResult}>
        {
          searchResult.map(elem => (
            <div key={elem.account_id} 
              className={styles.searchResultCard} 
              onClick={() => {
                navigate(`/profile/${elem.account_id}`)
                setInputData("")
                setSearchResult([])
              }}>
              <img src={elem.avatar} alt={elem.personaname} />
              <div className={styles.wrapper}>
                <p>{elem.personaname}</p>
                <p>{elem.account_id}</p>
              </div>
            </div>
          ))
        }
      </div>
        )
      }
      <Search size={14} strokeWidth={2.2} className={styles.searchIcon} aria-hidden="true" />
      <input
        autoComplete="off"
        aria-label='Wyszukaj gracza'
        type="text"
        name="searchBar"
        id="searchBar"
        placeholder='Wyszukaj gracza!'
        onChange={(e) => setInputData(e.target.value)} value={inputData}
      />
      <button type="submit">Wyszukaj</button>
    </form>
  )
}

export default SearchBar