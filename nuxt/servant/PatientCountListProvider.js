const calcCurrentDayPatient = ({ positive, discharge, death }) => {
    return positive - (discharge + death)
}
export default {
    serve(quantities){
        const re = []

        for (const [i, { positive, discharge, death }] of quantities.entries()) {
            if (i == 0) {
                re.push(calcCurrentDayPatient({ positive, discharge, death }))
            } else {
                re.push(re[i - 1] + calcCurrentDayPatient({ positive, discharge, death }))
            }
        }

        return re
    }
}