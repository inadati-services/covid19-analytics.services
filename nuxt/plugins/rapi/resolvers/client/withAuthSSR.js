import CryptoJS from 'crypto-js'
const cookieparser = process.server ? require('cookieparser') : undefined


export default {
    async req({ req }, demand, variables) {
        let auth = null
        let Authorization = ''

        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth)
            } catch (err) {
                console.error(err)
            }
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
