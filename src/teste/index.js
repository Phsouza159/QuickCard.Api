const 
      express = require('express')
    , app = express() 
    , pathAssets = `${__dirname}/assets`
    , router = require('express').Router()
    , cors = require('cors')
    , server = require('http').Server(app)
    , io = require('socket.io')(server)

var serverTeste = ((app) =>{

    app.use(cors({
        origin: 'http:127.0.0.1'
    }))

    app.use('/assets' , express.static(pathAssets))

    router.get('/' , async(req , res) => {

        res.sendFile(`${__dirname}/view/index.html`)
    })

    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
          console.log(data);
        })
    })


    server.listen(8080)
    app.use('/' , router)

    console.log('Server teste on http:127.0.0.1:8080')

})(app)