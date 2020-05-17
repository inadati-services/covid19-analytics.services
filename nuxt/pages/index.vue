<template>
    <section>
        <v-card>
            <h2 class="title font-weight-bold py-5 px-4">新型コロナ分析 公開都道府県一覧</h2>
            <v-divider></v-divider>
            <v-row class="px-5">
                <v-col v-for="(pref, i) in prefs" :key="i" cols="1" xl="1" lg="1" md="3" sm="3">
                    <n-link v-if="pref.is_published" :to="`/prefecture/${pref.id}`">{{pref.name}}</n-link>
                    <p v-else class="disable-link">{{pref.name}}</p>
                </v-col>
            </v-row>
        </v-card>
    </section>
</template>

<script>
export default {
    head(){
        return {
            title: "新型コロナ分析アプリ",
            titleTemplate: ""
        }
    },
    async asyncData(ctx) {
        const {
            app: { $rapi }
        } = ctx;
        const [prefs] = await Promise.all([$rapi.Query.readPrefs()]);

        return {
            prefs
        };
    }
};
</script>

<style lang="scss">
.disable-link {
    color: #757575;
    cursor: not-allowed;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>
