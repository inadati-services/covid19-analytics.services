import client from '../client/withAuthSSR'
import gql from 'graphql-tag'

export const demand = gql`
    query {
        readUserEmail {
            email
        }
    }
`

// resolver
export default async (ctx, variables) => {
    const { readUserEmail: user } = await client.req(ctx, demand)
    return user
}
