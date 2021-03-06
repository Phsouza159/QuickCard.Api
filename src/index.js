const alias = require('module-alias/register')
    , express = require('express')
    , bodyParser = require('body-parser')
    , peerMiddlewares = require('@middlewares/peerMiddlewares')
    , pendenciesMiddleware = require('@middlewares/pendenciesMiddleware')
    , cors = require('cors')
    , { requestLogger 
        , errorLogger } = require('@service/loggerService')
    , registreSwegger = require('./config/swegger.config')
    , fs = require('fs')
    , pathController = `${__dirname}/app/controllers`
    , portServer = process.env.PORT || 3000
    , peerServer = require('./app/peerServer/peerServer')

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
    app.use(peerMiddlewares)
    app.use(pendenciesMiddleware)

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
            let server = app.listen(portServer)
            registreSwegger(app)
        
            console.info(`Server listen on port ${portServer}`)
        
            peerServer(server, app)

            return app
        }
    }

})(express())

module.exports = server;