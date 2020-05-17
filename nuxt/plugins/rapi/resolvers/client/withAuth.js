import CryptoJS from 'crypto-js'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    async req(demand, variables) {
        let auth = null
        let Authorization = ''

        try {
            auth = JSON.parse(Cookie.get('auth'))
        } catch (err) {
            console.error(err)
        }

        if (auth.token) {
            const payload = CryptoJS.AES.decrypt(
                auth.token,
                process.env.NUXT_SECRETKEY
            )
            const token = payload.toString(CryptoJS.enc.Utf8).replace(/\"/g, '')
            Authorization = `Bearer ${token}`
        }

        const res = await fetch(process.env.GQL_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization,
            },
            body: JSON.stringify({
                query: demand.loc.source.body,
                variables,
            }),
        })
        const { data } = await res.json()
        return data
    },
}
