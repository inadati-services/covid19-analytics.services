import formatter from './formatter'
import { DataCenter } from '~/servant/DataCenter'

export default {
    get(quantities) {
        const dc = new DataCenter.Summon({ quantities })
        const {
            candleChart: {
                MA_SHORT_PERIOD,
                MA_LONG_PERIOD,
                MA_SHORT,
                MA_LONG,
                data,
                categories,
            },
        } = dc.serve()

        return {
            tooltip: {
                show: true,
                formatter: formatter(quantities),
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
            },
            legend: {
                data: [
                    '患者数',
                    `${MA_SHORT_PERIOD}日移動平均線`,
                    `${MA_LONG_PERIOD}日移動平均線`,
                ],
                top: 0,
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%',
            },
            xAxis: {
                type: 'category',
                data: categories,
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true,
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100,
                },
                {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 50,
                    end: 100,
                },
            ],
            series: [
                {
                    name: '患者数',
                    type: 'candlestick',
                    data: data,
                    itemStyle: {
                        borderColor: '#E01F54',
                        borderColor0: '#001852',
                    },
                },
                {
                    name: `${MA_SHORT_PERIOD}日移動平均線`,
                    type: 'line',
                    data: MA_SHORT,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },
                {
                    name: `${MA_LONG_PERIOD}日移動平均線`,
                    type: 'line',
                    data: MA_LONG,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },
            ],
        }
    },
}
