import client from '../client/withAuth'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($is_published: Boolean!) {
        updatePrefPublished(is_published: $is_published) {
            is_published
        }
    }
`

// resolver
export default async (pref, { is_published }) => {
    await client.req(demand, { is_published })

    return cache.Update('prefs', pref)
}
