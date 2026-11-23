import formatDuration from "./utils/formatDuration"
import formatSlots from "./utils/formatSlots"
import formatSouls from "./utils/formatSouls"
import formatTimeSince from "./utils/formatTimeSince"

export function createMatch(match, heroesData, itemsData) {

    const player = match.players[0]
    const hero = heroesData.find(hero => hero.id === player.hero_id)
    const item = player.items
        .filter(item => item.sold_time_s === 0)
        .map(item => itemsData.find(asset => asset?.id === item?.item_id))
        .filter(Boolean)

    return {
        result: match.players[0].player_match_outcome,
        mode: match.match_mode,
        duration: formatDuration(match.duration_s),
        timeSince: formatTimeSince(match.start_time),
        hero: {
            name: hero?.name,
            icon: hero?.images?.icon_image_small
        },
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        kda: ((player.kills + player.assists) / Math.max(player.deaths, 1)).toFixed(2),
        souls: formatSouls(player.net_worth),
        items: formatSlots(item)

    }
}

export function createPlayer({ steam, rank, history, matches, heroStats, mates: {mates, profiles} }, assets) {
    return {
        profile: {
            name: steam.personaname,
            profileID: steam.account_id,
            steamUrl: steam.profileurl,
            avatarUrl: steam.avatarfull,
        },
        rank: {
            rank: rank.rank,
            subrank: rank.subrank
        },
        history,
        matches,
        heroStats: heroStats.map(stats => {
            const hero = assets.heroes.find(h => h.id === stats.hero_id)
            return {
                id: stats.hero_id,
                name: hero?.name,
                icon: hero?.images?.icon_image_small,
                matches: stats.matches.length,
                wins: stats.wins,
                mvp: stats.mvp_rank_counts[0],
                winratio: `${((stats.wins/stats.matches.length)*100).toFixed(0)}%`,
                kda: ((stats.kills + stats.assists) / Math.max(stats.deaths, 1)).toFixed(2)
            }
        }),
        mateStats: mates.map(mate => {
            const profile = profiles.find(p => p.account_id === mate.mate_id)
            return {
                avatarURL: profile?.avatarmedium,
                name: profile?.personaname ?? "not found",
                played: mate.matches_played,
                wins: mate.wins,
                winratio: `${((mate.wins/mate.matches_played)*100).toFixed(0)}%`,
                profileURL: profile.profileurl,
                profileID: profile.account_id,
            }
        })
    }
}