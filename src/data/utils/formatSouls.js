const compact = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
})

export default function formatSouls(souls) {
    return compact.format(souls)
}