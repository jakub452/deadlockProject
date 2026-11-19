import { useEffect, useState } from "react";
import { fetchAssets } from "../api/deadlockApi";

export function useAssets() {
    const [assets, setAssets] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchAssets()
                setAssets(data)
            } catch (err) {
                setError(err.message)
            }
        }
        load()
    }, [])

    return { assets, error, isLoading: !assets && !error }
}