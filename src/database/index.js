const mongoose = require('mongoose');

const database = ((mongoose) => {
        let port = 27017
            , host = '177.133.30.238'
            , base = 'quickcarddb'
            , urlDatabase = `mongodb://${host}:${port}/${base}` 
            , urlNuvem = `mongodb+srv://quickcard:8VwHDiLdctura1es@quickcarddb.ggofu.mongodb.net/quickcarddb?retryWrites=true&w=majority`
                          
            , url = ''
            , isLocal = false
            , options = {
                useNewUrlParser : true
                , useFindAndModify : false
                , useCreateIndex : false
                , useUnifiedTopology : true
            }

        url = isLocal ? urlDatabase : urlNuvem

        mongoose.connect( url, options )

        mongoose.connection.on('error', err => {
            
            console.error(`Erro connect database on url:${url}` , err)
            throw new Error('Stop aplication!')
        });

        mongoose.connection.on('sucess', sucess => {

            console.log(`Connect sucess on url:${url}`)
        });

        mongoose.Promise = global.Promise

        return mongoose
})(mongoose)

module.exports = database