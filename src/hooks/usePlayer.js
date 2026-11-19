import { useEffect, useState } from "react";
import { getPlayerMatchHistoryData, getPlayerMatchHistoryMetadata, getPlayerRank, getPlayerSteamData } from "../api/deadlockApi";
import { createPlayer } from "../data/createPlayer";

export function usePlayer(id) {
    const [player, setPlayer] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        if(!id) return
        let ignore = false

        async function load() {
            setPlayer(null)
            setError(null)

            try {
                const [steam, rank, history, matches] = await Promise.all([
                    getPlayerSteamData(id),
                    getPlayerRank(id),
                    getPlayerMatchHistoryData(id),
                    getPlayerMatchHistoryMetadata(id)
                ])
                
                if(!ignore) setPlayer(createPlayer({ steam: steam[0], rank, history, matches }))
            } catch (err) {
                if(!ignore) setError(err.message)
            }

        }
        load()
        return () => { ignore = true }
    }, [id])

    return { player, error, isLoading: !player && !error }
}