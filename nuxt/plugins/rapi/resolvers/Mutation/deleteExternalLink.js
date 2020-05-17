import client from '../client/withAuth'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($id: ID!) {
        deleteExternalLink(id: $id) {
            id
            title
            url
        }
    }
`

// resolver
export default async (pref, {id}) => {
    const { deleteExternalLink: external_link } = await client.req(demand, {id})

    cache.Delete('external_links', external_link)
    pref.external_links = cache.Find('external_links')

    return cache.Update('prefs', pref)
}
