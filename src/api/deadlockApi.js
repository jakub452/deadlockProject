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
    const params = new URLSearchParams({
        search_query: input,
        limit: 10,
        min_matches_played_last_30d: 5,
        min_last_team_avg_badge: 0,
        matches_played_weight: 0.02,
    })

    const url = `https://api.deadlock-api.com/v1/players/steam-search?${params}`
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

export async function fetchAssets() {
    const [itemsRes, heroesRes, ranksRes] = await Promise.all([
        fetch(`https://api.deadlock-api.com/v1/assets/items/by-type/upgrade`),
        fetch(`https://api.deadlock-api.com/v1/assets/heroes`),
        fetch(`https://api.deadlock-api.com/v1/assets/ranks`)
    ])
    if (!itemsRes.ok || !heroesRes.ok) {
        throw new Error(`Res error: ${itemsRes.status} ${heroesRes.status} ${ranksRes.status}`)
    }
    const [heroes, items, ranks] = await Promise.all([heroesRes.json(), itemsRes.json(), ranksRes.json()])
    return { heroes, items, ranks }
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


export async function getPlayerMatchHistoryMetadata(accountID) {

    const params = new URLSearchParams({
        account_ids: accountID,
        only_filtered_players: true,
        include_player_info: true,
        include_player_items: true,
        order_by: "start_time",
        order_direction: "desc",
        limit: 10,
    })

    const url = `https://api.deadlock-api.com/v1/matches/metadata?${params}`
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

