const alias = require('module-alias/register')
    , express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , { requestLogger 
        , errorLogger } = require('@service/loggerService')
    , registreSwegger = require('./config/swegger.config')
    , fs = require('fs')
    , pathController = `${__dirname}/app/controllers`
    , portServer = process.env.PORT || 3000

var server = ((app) => {

    app.use(bodyParser.json({
        limit: '8mb'
    }))
    app.use(bodyParser.urlencoded({
        limit: '8mb',
        parameterLimit: 100000,
        extended: false 
    }))
    app.use(requestLogger)
    app.use(errorLogger)
    app.use(cors())

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