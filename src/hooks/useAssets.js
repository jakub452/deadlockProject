import { useEffect, useState } from "react";
import { fetchAssets } from "../api/deadlockApi";

export function useAssets() {
    const [assets, setAssets] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchAssets()
            .then(setAssets)
            .catch(err => setError(err.message))
    }, [])

    return { assets, error, isLoading: !assets && !error }
}