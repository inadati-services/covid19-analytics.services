export const MA_SHORT_PERIOD = 7
export const MA_LONG_PERIOD = 14

export const MACalculator = (chartData, dayRange) => {
    const result = []
    for (let i = 0, len = chartData.length; i < len; i++) {
        if (i < dayRange) {
            result.push('-')
            continue
        }
        let sum = 0
        for (let j = 0; j < dayRange; j++) {
            sum += chartData[i - j][1]
        }
        result.push(sum / dayRange)
    }
    return result
}
