
const baseApi = '/api'

module.exports = {
    v1 : {

        synchronism : {
            allowanonymous : true,
            base: `${baseApi}/v1/synchronism` 
            ,get : '/:id'
            ,post : '/:id'
        } ,

        login : {
            allowanonymous : true,
            base: `${baseApi}/v1/login` 
            ,post : '/'
        } ,

        student : {
            allowanonymous : false,
            base: `${baseApi}/v1/student` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        note : {
            allowanonymous : false,
            base: `${baseApi}/v1/note` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        notePad : {
            allowanonymous : false,
            base: `${baseApi}/v1/notepad` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        deck : {
            allowanonymous : false,
            base: `${baseApi}/v1/deck` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        } ,

        card : {
            allowanonymous : false,
            base: `${baseApi}/v1/card` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'     
        } ,
    }
}