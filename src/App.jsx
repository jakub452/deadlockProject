import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { getPlayerData } from './api/deadlockApi.js';

function App() {
  const [steamID, setSteamID] = useState("")
  const [playerData, setPlayerData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)



  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getPlayerData(steamID)
        setPlayerData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (!steamID){
      return
    } else {
      load()
    }
  }, [steamID]);



  return (
    <div>
      <Navbar onSearch={setSteamID} />
      <PlayerPage playerData={playerData} isLoading={isLoading} hasError={error} />
    </div>

  )
}

export default App
