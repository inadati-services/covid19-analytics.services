export default {
    serve(receive){
        return JSON.parse(JSON.stringify(receive))
    }
}