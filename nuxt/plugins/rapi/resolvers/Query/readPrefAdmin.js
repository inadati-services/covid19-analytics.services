import client from '../client/withAuthSSR'
import gql from 'graphql-tag'

export const demand = gql`
    query {
        readPrefAdmin {
            id
            is_published
            name
            quantities {
                id
                date
                positive
                death
                discharge
                sickbed_total
            }
        }
    }
`

// resolver
export default async (ctx, variables) => {
    const { readPrefAdmin: pref } = await client.req(ctx, demand)

    if (pref.quantities.length != 0) {
        for (const quant of pref.quantities) {
            let d = new Date(quant.date)
            quant.date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
        }
    }

    return pref
}
