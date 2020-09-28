const { ExpressPeerServer } = require('peer')

const typeClient = {
    MOBILE : 1 , 
    WEB : 2
}


const peerService = (() => {

    let self = {}
    , data = []
    , events = []

    //#region DATA CUSTOMER | EVENTS

    let registreHub = function(idHub, client) {
        let index = data.findIndex( e => e.idHub == idHub)
    
        if(index > -1) {
            let hub = data[index]
            
            hub.idHub = idHub
            hub.client = client

            data[index] = hub

            return
        }

        data.push({
            idHub , client
        })
    }

    let createCustomer = function(id, idHub, type , hub) {

        let client = hub != null ? hub.client : {}

        return {
            id , type , idHub, client
        }
    }

    let removerCustomer = function(id, type) {
        let index = data.findIndex( e => e.id == id && e.type == type)

        if(index){
           data[index] = {}
           clearNullClient()
        }
    }

    let removeByHub = function(idHub) {
        let index = data.findIndex( e => e.idHub == idHub)

        if(index > -1) {
           data[index] = {}
           clearNullClient()
        }
    }

    let getCustomer = function(id , type) {
       let index = data.findIndex( e => e.id == id && e.type == type)
       return data[index]
    }

    let setCustomer = function(id, idHub, type) {
        let index = data.findIndex( e => e.idHub == idHub)
        let hub = data[index]
        let customer =  createCustomer(id, idHub, type, hub)

        if(index > -1){
           data[index] = customer
           return
        }

        data.push(customer)
    }


    let clearNullClient = function() {
        let clients = []

        for(let i = 0; i < [].length; i += 1) {
            if(data[i].id !== undefined) {
                clients.push(data[i])
            }
        }

        data = clients 
    }

    //#endregion

    self.start = function(server) {
        self.peer = ExpressPeerServer(server, {
            path: ''
            , debug: 3
            , alive_timeout : 10000
        });

        self.registrePeer()
    }

    self.registreHub = function(idHub, hub) {
        registreHub(idHub, hub)
    }

    self.addClient = function(id, idHub, type) {

        if(id != undefined || id != 'undefined') {
            setCustomer(id, idHub, type)
        }
    }

    self.getClient = function(id, type) {
        return getCustomer(id, type)
    }

    self.removeClient = function(id, type) {
        removerCustomer(id, type)
    }

    self.getData = function() {
        return data.map( e => {
            return {
                id : e.id , idHub : e.idHub , type : e.type
            }
        })
    }

    self.clearNullClient = function() {
        clearNullClient()
    }


    self.addEvent = function(type, callback) {
        events[type] = callback
    }

    self.emit = function(type, data) {
        let event = events[type]

        if(typeof event === 'function') {
            event(data)
        }
    }

    self.registrePeer = function() {

        self.peer.on('connection', (client) => {

            console.log('connection', client.getId())

            self.registreHub(client.getId(), client)
        })
        
        
        self.peer.on('disconnect', (client) => {
        
            removeByHub(client.getId())
            console.log('close', client.getId())
        })
        
        self.peer.on('error', (e) => {
            console.log('error', e)
        })
    }

    self.notifaction = function(id, type , data) {

        let customer = getCustomer(id, type)
       
        if(customer !== undefined){
            try {
              
                let send = {
                    type : 'data'
                    , payload : data
                }
    
                customer.client.send(send)
                return true

            } catch(e) {

                console.log('Erro to send menssag in socket' , e)
            }
           
        } 
    
        return false
    }

    return self
})()




module.exports = { typeClient, peerService } 