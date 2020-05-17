import cache from '../cache'
// export const demand = gql``

// resolver
export default (pref) => {
    
    if (!cache.Find('prefs')) {
        cache.Regist("prefs", [pref])
        cache.Regist('external_links', pref.external_links)
    } else if (cache.Find('prefs') && !cache.Find('external_links')) {
        cache.Regist('external_links', pref.external_links)
    }
    
    return cache.Find('prefs')
}
