import client from '../client'
import gql from 'graphql-tag'
import pclp from '~/servant/PatientCountListProvider'

export const demand = gql`
    query($id: ID!) {
        readPref(id: $id) {
            id
            name
            is_published
            quantities {
                date
                positive
                discharge
                death
                sickbed_total
            }
            external_links {
                title
                url
            }
        }
    }
`

// resolver
export default async ({ id }) => {
    const { readPref: pref } = await client.req(demand, { id })

    const patient_count_ls = pclp.serve(pref.quantities)

    for (const [ i, q ] of pref.quantities.entries()) {
        q.patient = patient_count_ls[i]
        if (i == 0){
            q.yesterday_patient = 0
        } else {
            q.yesterday_patient = patient_count_ls[i - 1]
        }
    }

    return pref
}
