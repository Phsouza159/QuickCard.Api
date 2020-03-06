console.log('start')

const hubConnection = (function HubConnection(options) {

    var _options = { }
    var _services = []
    var _socket = undefined

    this.start = ( url  ) => {
        _socket = io.connect(url)
    }

    this.registreService = (nameService , fnService) => {

        let isRegistre = _services.includes( e => keyName == nameService)

        if(isRegistre) {
            throw new Error(`service ${nameService} already registered`)
        }

        _services.push( {
            keyName : nameService 
            , fnService
        })
    }

    //#region INVOKE METHOD

    this.invoke = async ( poitnServe , objectSend ) => {
        
        let dataSend

        switch(true){
            
            case typeof objectSend == 'function' :
            
                let isAsync = objectSend[Symbol.toStringTag] === 'AsyncFunction'
                , data = isAsync ? await objectSend() : objectSend() 
                
                dataSend = typeof data == 'object' ? JSON.stringify(data) : {}

                break
            
            case typeof objectSend == 'object':

                dataSend = JSON.stringify(objectSend)

                break

            case typeof objectSend == 'string':

                dataSend = JSON.stringify({ mens : objectSend})

                break

            default:

                throw `type objectSend not suport. Type : ${typeof objectSend}`

        }

        _send(poitnServe , dataSend)
    }

    //#endregion


    //#region   

    var _send = async ( poitnServe , dataSend ) => {

        _socket.emit('hubConnect' , {
            type : ''
            , clientId : ''
            , time : new Date().getUTCDate()
            , data : dataSend
            , resolve : poitnServe
        })
    }

    //endregion
})

