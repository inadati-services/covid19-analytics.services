export default (quantities) => {
    const categories = []
    const chartData = []

    for (const { date, yesterday_patient, patient } of quantities) {

        const d = new Date(date)
        categories.push(
            `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
        )

        chartData.push([yesterday_patient, patient, patient, patient])
    }

    return [
        chartData,
        categories
    ]
}