<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1 py-3">新型コロナ関連サイト</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <v-list-item to="/" two-line>
                    <v-list-item-content>
                        <v-list-item-title>トップページ</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                    href="https://www.washingtonpost.com/graphics/2020/health/corona-simulation-japanese/"
                    target="_blank"
                    two-line
                >
                    <v-list-item-content>
                        <v-list-item-title>自粛効果シミュレーションサイト</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item href="https://www.covid19-yamanaka.com/" target="_blank" two-line>
                    <v-list-item-content>
                        <v-list-item-title>山中伸弥による新型コロナウイルス情報発信</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                    v-for="(link, i) in pref.external_links"
                    :key="i"
                    :href="link.url"
                    target="_blank"
                    two-line
                >
                    <v-list-item-content>
                        <v-list-item-title>{{link.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="blue" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>
                <h1 class="subtitle-1 font-weight-bold">新型コロナ分析アプリ</h1>
            </v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container>
                <div v-if="!pref.is_published">
                    <p>当ページは現在、準備中です。</p>
                </div>
                <div v-else style="width: 100%;">
                    <div class="mt-3 pb-1">
                        <v-card>
                            <v-alert
                                id="alert"
                                class="elevation-2 mb-2"
                                :type="warningIndicator.alert"
                                tile
                            >{{ warningIndicator.message }}</v-alert>
                            <v-card-title class="pb-2">
                                <h2
                                    style="width: 100%;"
                                    class="title font-weight-bold"
                                >{{pref.name}}の新型コロナ分析</h2>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <p>終息傾向指標</p>
                                            <p
                                                :class="endTrendIndexStyles"
                                                class="display-2"
                                            >{{endTrendIndex}}</p>
                                        </v-col>
                                        <v-col>
                                            <p>病床使用率</p>
                                            <p
                                                :class="sickBedUseRateStyles"
                                                class="display-2"
                                            >{{sickBedUseRate}}%</p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <p>{{PATIENT_DEC_PERIOD}}日間連続患者数減少</p>
                                            <p
                                                :class="isPatientDecStyles"
                                                class="display-2"
                                            >{{isPatientDecStr}}</p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <p>
                                    ※終息傾向指標とは？
                                    <br />2つの移動平均線の開き具合の事で、終息の傾向の強さを示します。
                                    <br />計算式は下記のとおりです。
                                    <br />
                                    （{{MA_LONG_PERIOD}}日間移動平均 - {{MA_SHORT_PERIOD}}日間移動平均）
                                </p>
                                <p>
                                    上記、3指標は基準以上の場合は緑文字、基準未満の場合は赤文字で表示されます。
                                    <br />各基準は下記のとおりです。
                                    <br />・終息傾向指標30以上
                                    <br />・病床使用率25%以下
                                    <br />
                                    ・{{PATIENT_DEC_PERIOD}}日間連続の患者減少が「OK!」
                                </p>
                                <p>詳細は下記チャートをご覧ください。</p>
                            </v-card-text>
                        </v-card>
                    </div>

                    <candle-chart class="mt-5 pt-5" :quantities="pref.quantities"></candle-chart>
                    <pie-chart class="mt-5 pt-5" :quantities="pref.quantities"></pie-chart>
                </div>
            </v-container>
        </v-content>

        <v-footer app>
            <span class="overline">&copy; 2020 COVID19 ANALYTICS</span>
        </v-footer>
    </div>
</template>

<script>
import CandleChart from "~/components/CandleChart";
import PieChart from "~/components/PieChart";
import { DataCenter } from "~/servant/DataCenter";

export default {
    layout: "pref",
    components: {
        CandleChart,
        PieChart
    },
    head() {
        return {
            title: this.pref.name,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: `${this.pref.name}の新型コロナウイルスの感染傾向を分析するアプリです。`
                }
            ]
        };
    },
    data() {
        return {
            drawer: false
        };
    },
    async asyncData({ app: { $rapi }, params, error }) {
        const [pref] = await Promise.all([$rapi.Query.readPref(params)]);

        if (!pref.is_published || pref.quantities.length < process.env.PATIENT_DEC_PERIOD) {
            error({
                statusCode: 404,
                message: "ページが存在しません。"
            });
            return;
        }

        const dc = new DataCenter.Summon({ quantities: pref.quantities });
        const {
            candleChart: {
                MA_SHORT_PERIOD,
                MA_LONG_PERIOD,
                PATIENT_DEC_PERIOD,
                endTrendIndex,
                warningIndicator,
                isPatientDecrease
            },
            pieChart: { sickBedUseRate }
        } = dc.serve();

        return {
            pref,
            MA_SHORT_PERIOD,
            MA_LONG_PERIOD,
            PATIENT_DEC_PERIOD,
            warningIndicator,
            endTrendIndex,
            sickBedUseRate,
            isPatientDecrease
        };
    },
    computed: {
        endTrendIndexStyles() {
            return this.endTrendIndex >= 30
                ? "green--text darken-4"
                : "red--text accent-4";
        },
        sickBedUseRateStyles() {
            return this.sickBedUseRate <= 25
                ? "green--text darken-4"
                : "red--text accent-4";
        },
        isPatientDecStyles() {
            return this.isPatientDecrease
                ? "green--text darken-4"
                : "red--text accent-4";
        },
        isPatientDecStr() {
            return this.isPatientDecrease ? "OK!" : "No";
        }
    }
};
</script>

<style lang="scss" scoped>
</style>