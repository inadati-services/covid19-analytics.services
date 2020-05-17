<template>
    <section>
        <h2 class="mb-3">{{ pref.name }}の各種情報入力</h2>
        <v-switch v-model="pref.is_published" :label="`ページの公開: ${isPublishedStr}`" @change="updatePrefPublished(pref)"></v-switch>
        <regist-dialog
            :pref="pref"
            :visible="dialog.regist.visible"
            @close="dialog.regist.visible = false"
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
                    <v-btn color="primary" @click="dialog.regist.visible = true">新規作成</v-btn>
                </v-row>
            </v-container>

            <v-data-table
                :headers="headers"
                :items="pref.quantities"
                disable-pagination
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
import RegistDialog from "~/components/Dialog/Quantity/regist";
import UpdateDialog from "~/components/Dialog/Quantity/update";
import DeleteDialog from "~/components/Dialog/Quantity/delete";

export default {
    middleware: "authenticated",
    layout: "admin",
    components: {
        RegistDialog,
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
        this.$rapi.Query.cachePrefAdmin(this.pref);
    },
    async asyncData(ctx) {
        const {
            app: { $rapi }
        } = ctx;

        const [pref] = await Promise.all([$rapi.Query.readPrefAdmin(ctx)]);

        return {
            pref
        };
    },
    data() {
        return {
            dialog: {
                regist: {
                    visible: false
                },
                update: {
                    visible: false,
                    data: {
                        id: "",
                        date: "",
                        positive: 0,
                        death: 0,
                        discharge: 0,
                        sickbed_total: 0
                    }
                },
                delete: {
                    visible: false,
                    data: {
                        id: "",
                        date: "",
                        positive: 0,
                        death: 0,
                        discharge: 0,
                        sickbed_total: 0
                    }
                }
            },
            headers: [
                {
                    text: "日時",
                    align: "start",
                    sortable: false,
                    value: "date"
                },
                { text: "新規陽性者数", value: "positive", sortable: false },
                { text: "新規退院者数", value: "discharge", sortable: false },
                { text: "新規死者数", value: "death", sortable: false },
                { text: "病床総数", value: "sickbed_total", sortable: false },
                { text: "編集", value: "actions", sortable: false }
            ]
        };
    },
    methods: {
        setData(type, data) {
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
        },
        async updatePrefPublished(){
            await Promise.all([
                this.$rapi.Mutation.updatePrefPublished(this.pref, this.pref)
            ])
        }
    },
    computed: {
        isPublishedStr() {
            return this.pref.is_published ? "公開" : "非公開" 
        }
    },
};
</script>

<style lang="scss" scoped></style>
