import client from '../client/withAuth'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($id: ID!, $title: String!, $url: String!) {
        updateExternalLink(id: $id, title: $title, url: $url) {
            id
            title
            url
        }
    }
`

// resolver
export default async (pref, {id, title, url}) => {
    const { updateExternalLink: external_link } = await client.req(demand, {id, title, url})

    cache.Update('external_links', external_link)
    pref.external_links = cache.Find('external_links')

    return cache.Update('prefs', pref)
}
