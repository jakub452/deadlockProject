export async function getPlayerData(steamID) {
    const url = `https://api.deadlock-api.com/v1/players/hero-stats?account_ids=${steamID}&game_mode=normal`
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Res error: ${res.status}`)
        }
        const result = await res.json();
        return result
    } catch (err) {
        console.error(err.message);
        return []
    }
}

export async function getAllHeroes() {
    const url = `https://api.deadlock-api.com/v1/assets/heroes/`
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Res error: ${res.status}`)
        }
        const result = await res.json()
        return result
    } catch (err) {
        console.error(err.message)
        return []
    }
}
