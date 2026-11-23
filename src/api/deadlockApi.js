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

export async function fetchAssets() {
    const [itemsRes, heroesRes, ranksRes] = await Promise.all([
        fetch(`https://api.deadlock-api.com/v1/assets/items/by-type/upgrade`),
        fetch(`https://api.deadlock-api.com/v1/assets/heroes`),
        fetch(`https://api.deadlock-api.com/v1/assets/ranks`)
    ])
    if (!itemsRes.ok || !heroesRes.ok || !ranksRes.ok) {
        throw new Error(`Res error: ${itemsRes.status} ${heroesRes.status} ${ranksRes.status}`)
    }
    const [heroes, items, ranks] = await Promise.all([heroesRes.json(), itemsRes.json(), ranksRes.json()])
    return { heroes, items, ranks }
}

export async function fetchPlayer(id) {

    const params = new URLSearchParams({
        account_ids: id,
        only_filtered_players: true,
        include_player_info: true,
        include_player_items: true,
        order_by: "start_time",
        order_direction: "desc",
        limit: 10,
    })

    const [steamRes, rankRes, historyRes, matchesRes, heroStatsRes] = await Promise.all([
        fetch(`https://api.deadlock-api.com/v1/players/steam?account_ids=${id}`),
        fetch(`https://api.deadlock-api.com/v1/players/${id}/rank`),
        fetch(`https://api.deadlock-api.com/v1/players/${id}/match-history`),
        fetch(`https://api.deadlock-api.com/v1/matches/metadata?${params}`),
        fetch(`https://api.deadlock-api.com/v1/players/hero-stats?account_ids=${id}&min_unix_timestamp=1793908800`)
    ])
    if (!steamRes.ok || !rankRes.ok || !historyRes.ok || !matchesRes.ok || !heroStatsRes) {
        throw new Error(`Res error: ${steamRes.status} ${rankRes.status} ${historyRes.status} ${matchesRes.status} ${heroStatsRes.status}`)
    }
    const [steam, rank, history, matches, heroStats] = await Promise.all([steamRes.json(), rankRes.json(), historyRes.json(), matchesRes.json(), heroStatsRes.json()])
    if (!steam[0]) {
        throw new Error(`Player not found!`)
    }
    return { steam: steam[0], rank, history, matches, heroStats }
}

