import CryptoJS from 'crypto-js'
import client from '../client'
import gql from 'graphql-tag'

export const demand = gql`
    query($email: String!, $password: String!) {
        getToken(email: $email, password: $password) {
            id
            token
        }
    }
`

// resolver
export default async ({email, password}) => {
    let { getToken: { id, token } } = await client.req(demand, {email, password})

    token = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        process.env.NUXT_SECRETKEY
    ).toString()
    return {
        id,
        token,
    }
}
