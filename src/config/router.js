
const baseApi = '/api'

module.exports = {
    v1 : {
        login : {
            allowanonymous : true,
            base: `${baseApi}/v1/login` 
            ,post : '/'
        } ,

        student : {
            allowanonymous : true,
            base: `${baseApi}/v1/student` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        note : {
            allowanonymous : true,
            base: `${baseApi}/v1/note` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        notePad : {
            allowanonymous : true,
            base: `${baseApi}/v1/notepad` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        deck : {
            allowanonymous : true,
            base: `${baseApi}/v1/deck` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        card : {
            allowanonymous : true,
            base: `${baseApi}/v1/card` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'     
        }
    }
}