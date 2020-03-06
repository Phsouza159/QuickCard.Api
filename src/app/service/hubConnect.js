const io = require('socket.io')

const hubConnectServe = (function HubConnectServe( server , options){

    var observer = undefined
        , socketIo = io(server)
        , self = this
    
    this.registre = (service) => {

        observer = service
    }

    this.start = async () => {
        socketIo.on('connection', async (socket) => {
            socket.on('hubConnect', async (data) => {
                self._env_input(data)
            })
        })
    }

    this._env_input = async (data) => {
        console.log(data);
        let fn = observer[data.resolve]

        if(fn != null) {

            fn(JSON.parse(data.data))
        } else {
        }
    }
})

module.exports = hubConnectServe