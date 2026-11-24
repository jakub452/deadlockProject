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
    const [itemsRes, heroesRes, ranksRes, rankedSeasonRes] = await Promise.all([
        fetch(`https://api.deadlock-api.com/v1/assets/items/by-type/upgrade`),
        fetch(`https://api.deadlock-api.com/v1/assets/heroes`),
        fetch(`https://api.deadlock-api.com/v1/assets/ranks`),
        fetch(`https://api.deadlock-api.com/v1/assets/ranked-seasons`)
    ])
    if (!itemsRes.ok || !heroesRes.ok || !ranksRes.ok || !rankedSeasonRes.ok) {
        throw new Error(`Res error: ${itemsRes.status} ${heroesRes.status} ${ranksRes.status} ${rankedSeasonRes.status}`)
    }
    const [heroes, items, ranks, rankedSeason] = await Promise.all([heroesRes.json(), itemsRes.json(), ranksRes.json(), rankedSeasonRes.json()])
    return { heroes, items, ranks, rankedSeason }
}

export async function fetchPlayer(id) {

    const [steamRes, rankRes, heroStatsRes, games, mates] = await Promise.all([
        fetch(`https://api.deadlock-api.com/v1/players/steam?account_ids=${id}`),
        fetch(`https://api.deadlock-api.com/v1/players/${id}/rank`),
        fetch(`https://api.deadlock-api.com/v1/players/hero-stats?account_ids=${id}&min_unix_timestamp=1793908800`),
        fetchGames(id),
        fetchMates(id)
    ])
    if (!steamRes.ok || !rankRes.ok || !heroStatsRes.ok) {
        throw new Error(`Res error: ${steamRes.status} ${rankRes.status} ${heroStatsRes.status}`)
    }
    const [steam, rank, heroStats] = await Promise.all([steamRes.json(), rankRes.json(), heroStatsRes.json()])
    if (!steam[0]) {
        throw new Error(`Player not found!`)
    }
    console.log(games)
    return { steam: steam[0], rank, heroStats, games, mates }
}

async function fetchGames(id) {
    const matchHistoryRes = await fetch(`https://api.deadlock-api.com/v1/players/${id}/match-history`)
    if (!matchHistoryRes.ok) throw new Error(`Game history error: ${matchHistoryRes.status}`)
    const matchHistory = await matchHistoryRes.json()

    const gameIds = matchHistory.slice(0, 10).map(g => g.match_id).join(",")

    const params = new URLSearchParams({
        include_info: true,
        include_more_info: true,
        include_player_info: true,
        include_player_kda: true,
        include_player_items: true,
        include_player_stats: true,
        order_by: "start_time",
        order_direction: "desc",
        match_ids: gameIds,
    })

    const gameMetadataRes = await fetch(`https://api.deadlock-api.com/v1/matches/metadata?${params}`)
    const gameMetadata = await gameMetadataRes.json()

    const ids = [...new Set(gameMetadata.flatMap(g => g.players.map(p => p.account_id)))].join(",")
    const playerProfilesRes = await fetch(`https://api.deadlock-api.com/v1/players/steam?account_ids=${ids}`)
    if(!playerProfilesRes.ok) throw new Error(`Profiles error: ${playerProfilesRes.status}`)
    const playerProfiles = await playerProfilesRes.json()

    return { matchHistory, gameMetadata, playerProfiles }
}

async function fetchMates(id) {
    const matesRes = await fetch(`https://api.deadlock-api.com/v1/players/${id}/mate-stats?same_party=true&min_matches_played=3`)
    if (!matesRes.ok) throw new Error(`Mates error: ${matesRes.status}`)
    const mates = await matesRes.json()

    if (mates.length === 0) return { mates, profiles: [] }

    const ids = mates.map(m => m.mate_id).join(",")
    const profilesRes = await fetch(`https://api.deadlock-api.com/v1/players/steam?account_ids=${ids}`)
    if (!profilesRes.ok) throw new Error(`Profiles error: ${profilesRes.status}`)
    const profiles = await profilesRes.json()


    return { mates, profiles }
}
