export default ({ store, redirect }) => {
    // ユーザが認証されていない場合
    if (!store.state.auth) {
        return redirect('/admin/login')
    }
}
