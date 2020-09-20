
const baseApi = '/api'

module.exports = {

    base : `${baseApi}/v1`,

    home : '' ,

    v1 : {

        synchronism : {
            allowanonymous : false,
            base: `${baseApi}/v1/synchronism` 
            ,get : '/'
        } ,

        wrtc : {
            base: `/webrtc`,
            get : `/clients`,
            disconnect : `/disconnectClient/:id`,
            registreClient : '/registreConnect/:idHub/:idClient/:type'
        } , 

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
            ,getImgProfileById : '/imgProfile/:id'
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
            ,getInfoDecks : '/info' 
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