const alias = require('module-alias/register')
    , express = require('express')
    , bodyParser = require('body-parser')
    , { requestLogger 
        , errorLogger } = require('@service/loggerService')
    , registreSwegger = require('./config/swegger.config')
    , fs = require('fs')
    , pathController = `${__dirname}/app/controllers`
    , portServer = process.env.APP_PORT

var server = ((app) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(requestLogger)
    app.use(errorLogger)


    const controllers = fs.readdirSync(pathController)
    
    controllers.map( controller => {
        try{
            if(controller.includes('.js'))
                require(`${pathController}/${controller}`)(app)

        }catch(err){

            console.error(`Erro no controller : ${controller} ` , err)
            throw err
        }
    })

    return {
        start : () => {
            app.listen(portServer)
            registreSwegger(app)
        
            console.info(`Server listen on port ${portServer}`)
        
            return app
        }
    }

})(express())

module.exports = server;