export default function formatMatch(match, heroesData, itemsData) {

    const matchModes = {
        1: "Unranked",
        4: "Ranked"
    }


    function formatDuration(s) {
        const min = Math.floor(s / 60)
        const sec = s % 60

        const duration = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`

        return duration
    }

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

    function formatTimeSince(dateString) {
        const gameDate = new Date(dateString.replace(" ", "T") + "Z")
        const seconds = Math.floor((Date.now() - gameDate.getTime()) / 1000)

        if (seconds < 60) return rtf.format(-seconds, "second")

        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return rtf.format(-minutes, "minute")

        const hours = Math.floor(minutes / 60)
        if (hours < 24) return rtf.format(-hours, "hour")

        const days = Math.floor(hours / 24)
        if (days < 30) return rtf.format(-days, "day")

        const months = Math.floor(days / 30)
        if (months < 12) return rtf.format(-months, "month")
            
        return rtf.format(-Math.floor(months / 12), "year")
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
        timeSince: formatTimeSince(match.start_time),
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
                image: asset.shop_image_webp,
                id: asset.id
            }))

    }
}