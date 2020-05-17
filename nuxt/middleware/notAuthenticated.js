export default ({ store, redirect }) => {
    // ユーザが認証されてホームページにリダイレクトされた場合
    if (store.state.auth) {
        return redirect(`/admin/${store.state.auth.id}`)
    }
}
