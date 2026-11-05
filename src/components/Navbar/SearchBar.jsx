import { useState } from 'react'
import styles from './SearchBar.module.css'
import { Search } from 'lucide-react'


const SearchBar = ({ onSearch }) => {
  const [inputData, setInputData] = useState("")

  const handleSubmit = (e) => {
    const inputDataTrim = inputData.trim()
    e.preventDefault()
    if(!/^[0-9]{17}$/.test(inputDataTrim)) {
      alert('Nieprawidłowy steamID')
      return
    }
    onSearch(inputDataTrim)
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