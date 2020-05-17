<template>
    <div>
        <v-dialog v-model="visible" width="500" @click:outside="close">
            <v-card>
                <v-card-title class="headline">新規外部サイト追加</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-5">
                    <v-form>
                        <v-text-field v-model="dialogData.title" label="title" required></v-text-field>
                        <v-text-field v-model="dialogData.url" label="URL" required />
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-row class="pr-5">
                        <v-spacer></v-spacer>
                        <v-btn dark color="red" class="mr-2" @click="close">キャンセル</v-btn>
                        <v-btn color="primary" @click="create">登録</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import DataCloner from "~/servant/DataCloner";

export default {
    props: {
        pref: {
            type: Object
        },
        visible: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    data() {
        const defaultData = {
            title: '',
            url: ''
        }
        return {
            dialogData: DataCloner.serve(defaultData),
            defaultData
        };
    },
    methods: {
        close() {
            this.$emit("close");
        },
        async create() {
            await Promise.all([
                this.$rapi.Mutation.createExternalLink(this.pref, this.dialogData)
            ]);
            this.close();
        }
    },
    computed: {},
    watch: {
        visible(newValue, oldValue) {
            if (newValue == true) {
                this.dialogData = DataCloner.serve(this.defaultData);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>