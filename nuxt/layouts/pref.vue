<template>
    <v-app id="inspire" v-resize="mutateWindowSize">
        <nuxt/>
    </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    },
    methods: {
        ...mapMutations(['mutateWindowSize'])
    }
}
</script>
