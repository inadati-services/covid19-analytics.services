import client from '../client/withAuth'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($title: String!, $url: String!) {
        createExternalLink(title: $title, url: $url) {
            id
            title
            url
        }
    }
`

// resolver
export default async (pref, {title, url}) => {
    const { createExternalLink: external_link } = await client.req(demand, {title, url})

    cache.Create('external_links', external_link)
    pref.external_links = cache.Find('external_links')

    return cache.Update('prefs', pref)
}
