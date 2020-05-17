import getToken from './resolvers/Query/getToken'
import readPrefAdmin from './resolvers/Query/readPrefAdmin'
import readPrefAdmin2 from './resolvers/Query/readPrefAdmin2'
import cachePrefAdmin from './resolvers/Query/cachePrefAdmin'
import cachePrefAdmin2 from './resolvers/Query/cachePrefAdmin2'
import readUserEmail from './resolvers/Query/readUserEmail'
import readPrefs from './resolvers/Query/readPrefs'
import readPref from './resolvers/Query/readPref'

import registQuantity from './resolvers/Mutation/registQuantity'
import updateQuantity from './resolvers/Mutation/updateQuantity'
import deleteQuantity from './resolvers/Mutation/deleteQuantity'
import createExternalLink from './resolvers/Mutation/createExternalLink'
import updateExternalLink from './resolvers/Mutation/updateExternalLink'
import deleteExternalLink from './resolvers/Mutation/deleteExternalLink'
import updatePrefPublished from './resolvers/Mutation/updatePrefPublished'

export const rapi = {
    Query: {
        getToken,
        readPrefAdmin,
        readPrefAdmin2,
        cachePrefAdmin,
        cachePrefAdmin2,
        readUserEmail,
        readPrefs,
        readPref,
    },
    Mutation: {
        registQuantity,
        updateQuantity,
        deleteQuantity,
        createExternalLink,
        updateExternalLink,
        deleteExternalLink,
        updatePrefPublished
    },
}

// Insert it in the context of the framework you use
// example nuxt.js

export default (ctx, inject) => {
    inject('rapi', rapi)
}
