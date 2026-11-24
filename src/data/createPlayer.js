import formatDuration from "./utils/formatDuration"
import formatSlots from "./utils/formatSlots"
import formatSouls from "./utils/formatSouls"
import formatTimeSince from "./utils/formatTimeSince"


// function

export function createPlayer({ steam, rank, heroStats, games: {matchHistory, gameMetadata, playerProfiles}, mates: {mates, profiles} }, assets) {
    const SEASON = assets.rankedSeason.find(s => s.name === "Beta Season 2")
    const seasonStart = SEASON?.intervals[0].start_timestamp
    const seasonRanked = matchHistory.filter(m => m.match_mode === 4 && m.start_time >= seasonStart)
    return {
        profile: {
            name: steam.personaname,
            profileID: steam.account_id,
            steamUrl: steam.profileurl,
            avatarUrl: steam.avatarfull,
        },
        // rank: name, subtier, image, wins, loses, winratio
        rank: {
            tier: rank.rank,
            subrank: rank.subrank,
            name: assets.ranks.find(r => r.tier === rank.rank).name,
            icon: assets.ranks.find(r => r.tier === rank.rank)?.images[`large_subrank${rank.subrank}`],
            wins: seasonRanked.filter(m => m.player_match_outcome === 1).length,
            loses: seasonRanked.filter(m => m.player_match_outcome === 2).length,
            winrate: `${((seasonRanked.filter(m => m.player_match_outcome === 1).length / seasonRanked.length*100)).toFixed(1)}%`
        },
        games: gameMetadata.map(game => {
            const player = game.players.find(p => p.account_id === steam.account_id)
            const hero = assets.heroes.find(h => h.id === player.hero_id)
            const item = player.items
                .filter(item => item.sold_time_s === 0)
                .map(item => assets.items.find(asset => asset.id === item.item_id))
                .filter(Boolean)

            return {
                id: game.match_id,
                gamemode: game.match_mode,
                outcome: player.player_match_outcome,
                timeSince: formatTimeSince(game.start_time),
                duration: formatDuration(game.duration_s),
                playerHero: {
                    name: hero.name,
                    icon: hero.images.icon_image_small
                },
                level: player.player_level,
                kills: player.kills,
                deaths: player.deaths,
                assists: player.assists,
                kda: ((player.kills + player.assists) / Math.max(player.deaths, 1)).toFixed(2),
                networth: formatSouls(player.net_worth),
                soulspm: (player.net_worth / (game.duration_s / 60)).toFixed(0),
                lasthits: player.last_hits,
                items: formatSlots(item),
                players: game.players.map(player => {
                    const hero = assets.heroes.find(h => h.id === player.hero_id)
                    return {
                        name: player.personaname,
                        playerHero: {
                            name: hero.name,
                            icon: hero.images.icon_image_small,
                        }
                    }
                })


            }
        }),

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
                avatarURL: profile?.avatar,
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