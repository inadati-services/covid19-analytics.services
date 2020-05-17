const cookieparser = process.server ? require('cookieparser') : undefined

export const strict = false
export const state = () => ({
    auth: null,
    windowSize: {
        x: 0,
        y: 0
    }
})
export const mutations = {
    mutateAuth(state, auth) {
        state.auth = auth
    },
    mutateWindowSize(state) {
        state.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
}
export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth)
            } catch (err) {}
        }
        commit('mutateAuth', auth)
    },
}
