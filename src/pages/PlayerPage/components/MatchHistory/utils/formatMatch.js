export default function formatMatch(match, heroesData, itemsData) {

    const matchModes = {
        1: "Unranked",
        4: "Ranked"
    }

    function formatDuration(s) {
        const min = Math.floor(s / 60)
        const sec = s % 60
        return `${min}:${String(sec).padStart(2, "0")}`
    }

    const player = match.players[0]
    const hero = heroesData.find(hero => hero.id === player.hero_id)
    const item = player.items
        .filter(item => item?.sold_time_s === 0)
        .map(item => itemsData.find(asset => asset?.id == item?.item_id))
        .filter(item => item?.type === "upgrade")

    return {
        result: match.players[0].player_match_outcome,
        mode: match.match_mode,
        duration: formatDuration(match.duration_s),
        hero: {
            name: hero?.name,
            icon: hero?.images?.icon_image_small
        },
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        kda: ((player.kills + player.assists) / Math.max(player.deaths, 1)).toFixed(2),
        souls: player.net_worth,
        lastHits: player.last_hits,
        denies: player.denies,
        items: 
            item.map(asset => ({
                name: asset.name,
                image: asset.shop_image_webp
            }))

    }
}