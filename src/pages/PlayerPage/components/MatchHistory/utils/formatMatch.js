export default function formatMatch(match, heroesData) {

    const matchModes = {
        1: "Unranked",
        4: "Ranked"
    }

    function formatDuration(s) {
        const min = Math.floor(s / 60)
        const sec = s % 60
        return `${min}:${String(sec).padStart(2, "0")}`
    }

    const hero = heroesData.find(hero => hero.id === match.hero_id)

    return {
        result: match.player_match_outcome === 1 ? "win" : "lose",
        mode: matchModes[match.match_mode],
        duration: formatDuration(match.match_duration_s),
        hero: {
            name: hero?.name,
            icon: hero?.images?.icon_image_small
        },
        kills: match.player_kills,
        deaths: match.player_deaths,
        assists: match.player_assists,
        kda: ((match.player_kills + match.player_assists) / Math.max(match.player_deaths, 1)).toFixed(2),
        souls: match.net_worth,
        lastHits: match.last_hits,
        denies: match.denies,
    }
}