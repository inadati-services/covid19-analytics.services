import client from '../client/withAuthSSR'
import gql from 'graphql-tag'

export const demand = gql`
    query {
        readPrefAdmin {
            id
            name
            external_links {
                id
                title
                url
            }
        }
    }
`

// resolver
export default async (ctx, variables) => {
    const { readPrefAdmin: pref } = await client.req(ctx, demand)

    return pref
}
