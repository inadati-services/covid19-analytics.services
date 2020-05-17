import client from '../client/withAuth'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($id: ID!) {
        deleteQuantity(id: $id) {
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
    const { deleteQuantity: quantity } = await client.req(demand, {
        id: data.id,
    })

    cache.Delete('quantities', quantity)
    pref.quantities = cache.Find('quantities')

    return cache.Update('prefs', pref)
}
