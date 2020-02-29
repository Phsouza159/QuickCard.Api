
const baseApi = '/api'

module.exports = {
    v1 : {
        annotation : {
            base: `${baseApi}/v1/annotation` 
            ,get : '/' 
            ,getById : '/:id' 
            ,post : '/'
            ,put : '/:id'
            ,delete : '/:id'
        }
    }
}