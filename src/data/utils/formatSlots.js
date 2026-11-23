export default function formatSlots(items) {
    const slots = []
    for (let i = 0; i < 12; i++) {
        slots.push(items[i])
    }
    return slots
}