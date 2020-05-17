import client from '../client'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    query {
        readPrefs {
            id
            name
            is_published
        }
    }
`

// resolver
export default async (variables) => {
    const { readPrefs: prefs } = await client.req(demand)

    return prefs
}
