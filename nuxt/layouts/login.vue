<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                    ref="loginForm"
                                    v-model="loginForm.valid"
                                >
                                    <v-text-field
                                        v-model="loginForm.email.model"
                                        :rules="loginForm.email.rules"
                                        label="Login"
                                        name="login"
                                        prepend-icon="person"
                                        type="text"
                                    />

                                    <v-text-field
                                        v-model="loginForm.pass.model"
                                        :rules="loginForm.pass.rules"
                                        label="Password"
                                        name="pass"
                                        prepend-icon="lock"
                                        type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    head() {
        return {
            title: "ログイン"
        };
    },
    mounted() {
        this.timerId = setInterval(() => {
            if (Cookie.get('auth')) {
                clearInterval(this.timerId)
                location.reload()
            }
        }, 1000)
    },
    data() {
        return {
            loginForm: {
                valid: true,
                email: {
                    model: '',
                    rules: [
                        (v) => !!v || 'メールアドレスが未入力です。',
                        (v) =>
                            /.+@.+\..+/.test(v) ||
                            '正しい形式のメールアドレスを入力してください。',
                    ],
                },
                pass: {
                    model: '',
                    rules: [(v) => !!v || 'パスワードが未入力です。'],
                },
            },
        }
    },
    methods: {
        login() {
            if (!this.$refs.loginForm.validate()) {
                this.snackbar = true
                return
            }

            setTimeout(async () => {
                const [auth] = await Promise.all([
                    this.$rapi.Query.getToken({
                        email: this.loginForm.email.model,
                        password: this.loginForm.pass.model,
                    }),
                ])

                if (auth.token) {
                    this.$store.commit('mutateAuth', auth)
                    Cookie.set('auth', auth, {
                        sameSite: "strict",
                        expires: 1,
                    })
                }
            }, 1000)
        },
    }
}
</script>
