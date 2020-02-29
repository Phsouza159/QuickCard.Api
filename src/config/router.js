
const baseApi = '/api'

module.exports = {
    v1 : {
        login : {
            base: `${baseApi}/v1/login` 
            ,post : '/'
        } ,

        note : {
            base: `${baseApi}/v1/note` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

    }
}