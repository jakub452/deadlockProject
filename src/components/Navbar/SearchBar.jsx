import { useState } from 'react'
import styles from './SearchBar.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router'


const SearchBar = () => {
  const [inputData, setInputData] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputDataTrim = inputData.trim()
    if(!/^[0-9]{17}$/.test(inputDataTrim)) {
      alert('Nieprawidłowy steamID')
      return
    }
    navigate(`/profile/${inputDataTrim}`)
    setInputData("")
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
        <Search size={14} strokeWidth={2.2} className={styles.searchIcon} aria-hidden="true" />
        <input 
          inputMode='numeric' 
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