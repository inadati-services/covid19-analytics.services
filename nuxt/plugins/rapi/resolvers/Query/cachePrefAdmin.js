import cache from '../cache'
// export const demand = gql``

// resolver
export default (pref) => {
    
    if (!cache.Find('prefs')){
        cache.Regist("prefs", [pref])
        cache.Regist('quantities', pref.quantities)
    } else if (cache.Find('prefs') && !cache.Find('quantities')){
        cache.Regist('quantities', pref.quantities)
    }
    
    return cache.Find('prefs')
}
