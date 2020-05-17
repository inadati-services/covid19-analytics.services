<template>
    <div>
        <v-dialog v-model="visible" width="500" @click:outside="close">
            <v-card>
                <v-card-title class="headline">データ編集</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-5">
                    <el-form label-width="30%">
                        <el-form-item label="日時">
                            <el-date-picker
                                v-model="dialogData.date"
                                type="date"
                                format="yyyy/M/d"
                                value-format="yyyy/M/d"
                                placeholder="日時"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="新規陽性者数">
                            <el-input-number v-model="dialogData.positive" size="small" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item label="新規退院者数">
                            <el-input-number v-model="dialogData.discharge" size="small" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item label="新規死者数">
                            <el-input-number v-model="dialogData.death" size="small" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item label="病床総数">
                            <el-input-number
                                v-model="dialogData.sickbed_total"
                                size="small"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                    </el-form>
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
            this.$emit("close")
        },
        async update() {
            await Promise.all([
                this.$rapi.Mutation.updateQuantity(this.pref, this.dialogData)
            ]);
            this.close();
        }
    },
    watch: {
        visible(newValue, oldValue) {
            if (newValue === true) {
                this.dialogData = DataCloner.serve(this.editData);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>