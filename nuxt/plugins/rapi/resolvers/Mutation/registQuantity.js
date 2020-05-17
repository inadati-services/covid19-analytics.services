import client from '../client/withAuth'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation(
        $date_str: String!
        $positive: Int!
        $death: Int!
        $discharge: Int!
        $sickbed_total: Int!
    ) {
        registQuantity(
            date_str: $date_str
            positive: $positive
            death: $death
            discharge: $discharge
            sickbed_total: $sickbed_total
        ) {
            id
            date
            positive
            death
            discharge
            sickbed_total
        }
    }
`

// resolver
export default async (pref, data) => {
    const { registQuantity: quantity } = await client.req(demand, {
        date_str: `${data.date} 00:00:00`,
        positive: data.positive,
        death: data.death,
        discharge: data.discharge,
        sickbed_total: data.sickbed_total,
    })

    const d = new Date(quantity.date)
    quantity.date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`

    cache.Create('quantities', quantity, "start")
    pref.quantities = cache.Find('quantities')

    return cache.Update('prefs', pref)
}
