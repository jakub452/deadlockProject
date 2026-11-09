export async function getPlayerData(steamID) {
    const url = `https://api.deadlock-api.com/v1/players/hero-stats?account_ids=${steamID}&game_mode=normal`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result
}

export async function searchPlayer(input) {
    const url = `https://api.deadlock-api.com/v1/players/steam-search?search_query=${input}&limit=5&min_matches_played_last_30d=5&min_last_team_avg_badge=0&matches_played_weight=0.02`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result
}
export async function getPlayerMatchHistoryData(id) {
    const url = `https://api.deadlock-api.com/v1/players/${id}/match-history`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result

}

export async function getPlayerRank(playerId) {
    const url = `https://api.deadlock-api.com/v1/players/${playerId}/rank`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result
}


export async function getRankData(rank) {
    const url = `https://api.deadlock-api.com/v1/assets/ranks/${rank}`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result
}

export async function getMatchMetadata(matchID) {
    const url = `https://api.deadlock-api.com/v1/matches/${matchID}/metadata`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result
}

export async function getPlayerSteamData(steamID) {
    const url = `https://api.deadlock-api.com/v1/players/steam?account_ids=${steamID}`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Res error: ${res.status}`)
    }
    const result = await res.json();
    return result
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
