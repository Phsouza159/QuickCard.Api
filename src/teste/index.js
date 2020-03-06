const 
    alias = require('module-alias/register')
    , express = require('express')
    , app = express() 
    , pathAssets = `${__dirname}/assets`
    , router = require('express').Router()
    , cors = require('cors')
    , server = require('http').Server(app)
    //, io = require('socket.io')(server)
    , hubConnectServe = require('@service/hubConnect')

var serverTeste = ( async (app) =>{

    const hubconnect = new hubConnectServe(server , {})

    hubconnect.registre(new function(){

        this.log = (data) => {

            console.log(data)
        }
    })

    app.use(cors({
        origin: 'http:127.0.0.1'
    }))

    app.use('/assets' , express.static(pathAssets))

    router.get('/' , async(req , res) => {

        res.sendFile(`${__dirname}/view/index.html`)
    })

    await hubconnect.start()

    /*
    io.on('connection', function (socket) {

        socket.on('hubConnect', function (data) {
          
            console.log(data);
        })

    })
    */


    server.listen(8080)
    app.use('/' , router)

    console.log('Server teste on http:127.0.0.1:8080')

})(app)