import { useEffect, useState } from "react";
import { fetchPlayer } from "../api/deadlockApi";
import { createPlayer } from "../data/createPlayer";

export function usePlayer(id, assets) {
    const [player, setPlayer] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        if (!id) return
        let ignore = false

        async function load() {
            setPlayer(null)
            setError(null)

            try {
                const playerData = await fetchPlayer(id)

                if (!ignore) setPlayer(createPlayer(playerData, assets))
            } catch (err) {
                if (!ignore) setError(err.message)
            }

        }
        load()
        return () => { ignore = true }
    }, [id])

    return { player, error, isLoading: !player && !error }
}