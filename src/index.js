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
        try{
            if(controller.includes('.js'))
                require(`${pathController}/${controller}`)(app)

        }catch(err){

            console.error(`Erro no controller : ${controller} ` , err)
            throw err
        }
    })

    app.listen(portServer)
    registreSwegger(app)

    console.info(`Server listen on port ${portServer}`)

    return app

})(express())