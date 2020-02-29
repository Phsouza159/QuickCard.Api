const alias = require('module-alias/register')
    , express = require('express')
    , bodyParser = require('body-parser')
    , registreSwegger = require('./config/swegger.config')
    , fs = require('fs')
    , pathController = `${__dirname}/app/controllers`
    , portServer = 3000

var server = ( async (app) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    const controllers = await fs.readdirSync(pathController)
    
    controllers.map( controller => {
        if(controller.includes('.js'))
            require(`${pathController}/${controller}`)(app)
    })

    app.listen(portServer)
    registreSwegger(app)

    console.info(`Server listen on port ${portServer}`)

    return app

})(express())