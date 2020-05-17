<template>
    <div>
        <v-dialog v-model="visible" width="500" @click:outside="close">
            <v-card>
                <v-card-title class="headline">データ編集</v-card-title>
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
                        <v-btn color="primary" @click="update">更新</v-btn>
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
        editData: {
            type: Object
        },
        visible: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    data() {
        return {
            dialogData: DataCloner.serve(this.editData)
        };
    },
    methods: {
        close() {
            this.$emit("close");
        },
        async update() {
            await Promise.all([
                this.$rapi.Mutation.updateExternalLink(this.pref, this.dialogData)
            ]);
            this.close();
        }
    },
    computed: {},
    watch: {
        visible(newValue, oldValue) {
            if (newValue == true) {
                this.dialogData = DataCloner.serve(this.editData)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>