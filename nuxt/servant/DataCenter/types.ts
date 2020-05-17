export type Quantity = {
    date: string
    patient: number
    yesterday_patient: number
    positive: number
    discharge: number
    death: number
    sickbed_total: number
}

export type CandleChart = {
    MA_SHORT_PERIOD: number
    MA_LONG_PERIOD: number
    PATIENT_DEC_PERIOD: number
    MA_SHORT: any
    MA_LONG: any
    data: any
    categories: any
    endTrendIndex: number
    warningIndicator: any
    isPatientDecrease: boolean
}

export type PieChart = {
    sickBedUseRate: number
    data: any
}

export type Receive = {
    quantities: [Quantity]
}