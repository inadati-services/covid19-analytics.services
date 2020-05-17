import { Quantity, CandleChart, PieChart, Receive } from './types'

export module DataCenter {
    export class Summon {
        quantities: [Quantity]
        candleChart: CandleChart = {
            MA_SHORT_PERIOD: 0,
            MA_LONG_PERIOD: 0,
            PATIENT_DEC_PERIOD: 0,
            MA_SHORT: [],
            MA_LONG: [],
            data: [],
            categories: [],
            endTrendIndex: 0,
            warningIndicator: {},
            isPatientDecrease: false
        }
        pieChart: PieChart = {
            sickBedUseRate: 0,
            data: [],
        }

        constructor(r: Receive) {
            this.quantities = r.quantities
            this.candleChart.MA_SHORT_PERIOD = Number(process.env.MA_SHORT_PERIOD)
            this.candleChart.MA_LONG_PERIOD = Number(process.env.MA_LONG_PERIOD)
            this.candleChart.PATIENT_DEC_PERIOD = Number(process.env.PATIENT_DEC_PERIOD)
            this.initCandleChart()
            this.initPieChart()
        }

        private MACalculator(dayRange: number) {
            const result = []
            for (let i = 0, len = this.candleChart.data.length; i < len; i++) {
                if (i < dayRange) {
                    result.push('-')
                    continue
                }
                let sum = 0
                for (let j = 0; j < dayRange; j++) {
                    sum += this.candleChart.data[i - j][1]
                }
                result.push(sum / dayRange)
            }
            return result
        }

        private setCandleChartData() {
            for (const { date, yesterday_patient, patient } of this
                .quantities) {
                const d = new Date(date)
                this.candleChart.categories.push(
                    `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
                )

                this.candleChart.data.push([
                    yesterday_patient,
                    patient,
                    patient,
                    patient,
                ])
            }
        }

        private setIsPatientDecrease(){
            for (let i = 1; i <= this.candleChart.PATIENT_DEC_PERIOD; i++) {
                const { yesterday_patient, patient } = this.quantities[this.quantities.length - i]
                if(yesterday_patient < patient) {
                    this.candleChart.isPatientDecrease = false
                    return
                }
            }
            this.candleChart.isPatientDecrease = true
        }

        private initCandleChart() {
            this.setCandleChartData()
            this.setIsPatientDecrease()
            this.candleChart.MA_SHORT = this.MACalculator(
                this.candleChart.MA_SHORT_PERIOD
            )
            this.candleChart.MA_LONG = this.MACalculator(
                this.candleChart.MA_LONG_PERIOD
            )

            const MA_SHORT_LATEST = this.candleChart.MA_SHORT[
                this.candleChart.MA_SHORT.length - 1
            ]
            const MA_LONG_LATEST = this.candleChart.MA_LONG[
                this.candleChart.MA_LONG.length - 1
            ]
            this.candleChart.endTrendIndex =
                Math.round((MA_LONG_LATEST - MA_SHORT_LATEST) * 100) / 100

            if (this.candleChart.endTrendIndex > 0) {
                this.candleChart.warningIndicator = {
                    alert: 'success',
                    message: '現在、感染は終息傾向です。',
                }
            } else {
                this.candleChart.warningIndicator = {
                    alert: 'error',
                    message: '現在、感染は拡大傾向です。',
                }
            }
        }

        private setPieChartData() {
            const { patient, sickbed_total } = this.quantities[
                this.quantities.length - 1
            ]
            if (patient > sickbed_total) {
                this.pieChart.data = [
                    {
                        name: `患者数: ${patient}\n
            病床不足: ${sickbed_total - patient}\n
            ${Math.round((patient / sickbed_total) * 100 * 100) / 100}%`,
                        value: patient,
                    },
                    {
                        name: `空き病床: ${sickbed_total -
                            patient}\n${Math.round(
                            ((sickbed_total - patient) / sickbed_total) *
                                100 *
                                100
                        ) / 100}%`,
                        value: sickbed_total - patient,
                    },
                ]
            } else if (patient == sickbed_total) {
                this.pieChart.data = [
                    {
                        name: `患者数: ${patient}\n${Math.round(
                            (patient / sickbed_total) * 100 * 100
                        ) / 100}%
    `,
                        value: patient,
                    },
                ]
            } else {
                this.pieChart.data = [
                    {
                        name: `患者数: ${patient}\n${Math.round(
                            (patient / sickbed_total) * 100 * 100
                        ) / 100}%
    `,
                        value: patient,
                    },
                    {
                        name: `空き病床: ${sickbed_total -
                            patient}\n${Math.round(
                            ((sickbed_total - patient) / sickbed_total) *
                                100 *
                                100
                        ) / 100}%`,
                        value: sickbed_total - patient,
                    },
                ]
            }
        }

        private setSickBedUseRate() {
            const { patient, sickbed_total } = this.quantities[
                this.quantities.length - 1
            ]
            this.pieChart.sickBedUseRate =
                Math.round((patient / sickbed_total) * 100 * 100) / 100
        }

        private initPieChart() {
            this.setPieChartData()
            this.setSickBedUseRate()
        }

        serve() {
            return {
                candleChart: this.candleChart,
                pieChart: this.pieChart,
            }
        }
    }
}
