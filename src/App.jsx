import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import PlayerPage from './pages/PlayerPage/PlayerPage.jsx'
import { getPlayerData } from './api/deadlockApi.js';

function App() {
  const [steamID, setSteamID] = useState("")
  const [playerData, setPlayerData] = useState([])

  useEffect(() => {
    if(!steamID) return
    getPlayerData(steamID)
      .then((data) => {
        setPlayerData(data)
      })
  }, [steamID]);

  return (

    <div>
      <Navbar onSearch={setSteamID} />
      <button onClick={() => {console.log(playerData)}}>console.log(playerData)</button>
      <PlayerPage playerData={playerData} />
    </div>

  )
}

export default App
