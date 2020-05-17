import { DataCenter } from '~/servant/DataCenter'

export default {
    get(quantities) {
        const { patient, sickbed_total } = quantities[quantities.length - 1]

        const dc = new DataCenter.Summon({ quantities })

        const {
            pieChart: {
                data
            },
        } = dc.serve()

        return {
            title: [
                {
                    text: `病床使用率 総病床数 ${sickbed_total}床`,
                },
            ],
            series: [
                {
                    type: 'pie',
                    radius: '100%',
                    center: ['50%', '50%'],
                    data: data,
                    animation: false,
                    label: {
                        position: 'inside',
                        alignTo: 'none',
                        bleedMargin: 5,
                    },
                },
            ],
        }
    },
}
