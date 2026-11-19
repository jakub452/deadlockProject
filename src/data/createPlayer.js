export function createPlayer({ steam, rank, history, matches }) {
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
    }
}