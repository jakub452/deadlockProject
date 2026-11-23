export default function formatDuration(s) {
    const min = Math.floor(s / 60)
    const sec = s % 60

    const duration = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`

    return duration
}