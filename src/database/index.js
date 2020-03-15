const mongoose = require('mongoose');

const database = ((mongoose) => {
        const port = 27017
            , host = '187.113.18.217'
            , base = 'quickcarddb'
            , urlDatabase = `mongodb://${host}:${port}/${base}` 
            , options = {
                useNewUrlParser : true
                , useFindAndModify : false
                , useCreateIndex : false
                , useUnifiedTopology : true
            }


        mongoose.connect( urlDatabase, options )

        mongoose.connection.on('error', err => {
            
            console.error(`Erro connect database on url:${urlDatabase}` , err)
            throw new Error('Stop aplication!')
        });

        mongoose.connection.on('sucess', sucess => {

            console.log(`Connect sucess on url:${urlDatabase}`)
        });

        mongoose.Promise = global.Promise

        return mongoose
})(mongoose)

module.exports = database