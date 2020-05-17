export default (quantities) => {
    return (params, ticket) => {
        const [
            {
                dataIndex,
                name: date,
                data: { '1': yesterday_patient, '2': patient },
            },
            { data: MA_SHORT },
            { data: MA_LONG },
        ] = params

        const { positive, discharge, death } = quantities[dataIndex]

        const compare_yesterday =
            patient > yesterday_patient
                ? `+${patient - yesterday_patient}`
                : patient < yesterday_patient
                ? `${patient - yesterday_patient}`
                : `±${patient - yesterday_patient}`

        return `
                日時: ${date}<br>
                患者数: ${patient}<br>
                患者数前日比: ${compare_yesterday}<br>
                &nbsp;&nbsp;新規陽性: ${positive}<br>
                &nbsp;&nbsp;新規非陽性: ${discharge + death} (うち退院: ${discharge}、死者: ${death})<br>
                終息傾向指標: ${Math.round((MA_LONG - MA_SHORT) * 100) / 100}<br>
            `
    }
}
