<template>
    <section>
        <h2 class="mb-3">{{pref.name}} 関連外部サイト登録</h2>

        <create-dialog
            :pref="pref"
            :visible="dialog.create.visible"
            @close="dialog.create.visible = false"
        />
        <update-dialog
            :pref="pref"
            :edit-data="dialog.update.data"
            :visible="dialog.update.visible"
            @close="dialog.update.visible = false"
        />
        <delete-dialog
            :pref="pref"
            :edit-data="dialog.delete.data"
            :visible="dialog.delete.visible"
            @close="dialog.delete.visible = false"
        />

        <v-card>
            <v-container>
                <v-row class="pa-3">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog.create.visible = true">新規作成</v-btn>
                </v-row>
            </v-container>

            <v-data-table
                :headers="headers"
                :items="pref.external_links"
                disable-pagination
                sort-by="date"
                sort-desc
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon class="mr-2" @click="setData('update', item)">mdi-pencil</v-icon>
                    <v-icon @click="setData('delete', item)">mdi-delete</v-icon>
                </template>
            </v-data-table>

        </v-card>
    </section>
</template>

<script>
const cookieparser = process.server ? require("cookieparser") : undefined;
import CreateDialog from "~/components/Dialog/ExternalLink/create";
import UpdateDialog from "~/components/Dialog/ExternalLink/update";
import DeleteDialog from "~/components/Dialog/ExternalLink/delete";

export default {
    middleware: "authenticated",
    layout: "admin",
    components: {
        CreateDialog,
        UpdateDialog,
        DeleteDialog
    },
    head(){
        return {
            title: '管理画面',
        }
    },
    validate({ params, req }) {
        let auth = null;

        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = JSON.parse(parsed.auth);
                return auth.id === params.id;
            } catch (err) {
                console.error(err);
                return false;
            }
        }

        return false;
    },
    mounted() {
        this.$rapi.Query.cachePrefAdmin2(this.pref);
    },
    async asyncData(ctx) {
        const {
            app: { $rapi }
        } = ctx;

        const [pref] = await Promise.all([$rapi.Query.readPrefAdmin2(ctx)]);

        return {
            pref
        };
    },
    data() {
        return {
            dialog: {
                create: {
                    visible: false
                },
                update: {
                    visible: false,
                    data: {
                        title: "",
                        url: ""
                    }
                },
                delete: {
                    visible: false,
                    data: {
                        title: "",
                        url: ""
                    }
                }
            },
            headers: [
                {
                    text: "title",
                    align: "start",
                    sortable: true,
                    value: "title"
                },
                { text: "URL", value: "url", sortable: true },
                { text: "編集", value: "actions", sortable: false }
            ]
        };
    },
    methods: {
        setData(type, data){
            switch (type) {
                case "update":
                    this.dialog.update.data = data;
                    this.dialog.update.visible = true;
                    break;
                case "delete":
                    this.dialog.delete.data = data;
                    this.dialog.delete.visible = true;
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>