<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item
                    v-for="(dlink, i) in drawerLinks"
                    :href="dlink.link"
                    :key="i"
                    link
                >
                    <v-list-item-action>
                        <v-icon>{{dlink.linkIcon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{dlink.linkText}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="blue" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title><h1 class="subtitle-1 font-weight-bold">新型コロナ分析アプリ</h1></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn fab icon small @click="logout">
                <v-icon>fas fa-sign-out-alt</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    mounted() {
        this.timerId = setInterval(() => {
            if (!Cookie.get('auth')) {
                clearInterval(this.timerId)
                location.reload()
            }
        }, 1000)
    },
    data({$root: {context: { params }}}) {

        return {
            timerId: 0,
            clipped: false,
            drawer: false,
            drawerLinks: [
                {
                    link: `/`,
                    linkIcon: "home",
                    linkText: "トップページ"
                },
                {
                    link: `/admin/${params.id}`,
                    linkIcon: "create",
                    linkText: "データ入力"
                },
                {
                    link: `/admin/external-links/${params.id}`,
                    linkIcon: "fas fa-link",
                    linkText: "関連サイト登録"
                }
            ],
            fixed: false,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/',
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire',
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
        }
    },
    methods: {
        logout() {
            Cookie.remove('auth')
            this.$store.commit('mutateAuth', null)
            clearInterval(this.timerId)
            this.$router.push('/admin/login')
        }
    },
}
</script>
