import formatDuration from "./utils/formatDuration"
import formatSlots from "./utils/formatSlots"
import formatSouls from "./utils/formatSouls"
import formatTimeSince from "./utils/formatTimeSince"


// function

export function createPlayer({ steam, rank, heroStats, games: {matchHistory, gameMetadata, playerProfiles}, mates: {mates, profiles} }, assets) {
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
        // players, rankdelta, rank
        
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