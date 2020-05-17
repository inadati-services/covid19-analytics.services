export default {
    serve(pref) {
        let date
        let sickbed_total
        if (pref.quantities.length == 0) {
            const d = new Date()
            d.setDate(d.getDate() - 1)
            date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
            sickbed_total = 0
        } else {
            const { date: dStr } = pref.quantities[0]

            const d = new Date(dStr)
            d.setDate(d.getDate() + 1)
            date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
            sickbed_total =
                pref.quantities[pref.quantities.length - 1].sickbed_total
        }

        return {
            date,
            positive: 0,
            death: 0,
            discharge: 0,
            sickbed_total,
        }
    },
}
