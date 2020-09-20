const { ExpressPeerServer } = require('peer')
  , express = require('express')
  , router = express.Router()
  , pathRoute = require('@config/router.js')
  , peerPath = pathRoute.v1.wrtc
  , { peerService , typeClient } = require('./peerService')

const peerServer = (server, app) => {

  peerService.start(server)

  router.get(peerPath.registreClient, async (req, res) => {

    let idHub = req.params.idHub
      idClient = req.params.idClient
      , type = req.params.type == typeClient.MOBILE ? typeClient.MOBILE : typeClient.WEB 

      peerService.addClient(idClient, idHub, type)

      res.send({})
  })

  app.use(`${peerPath.base}`, router)
  app.use(peerPath.base, peerService.peer);



  router.get(peerPath.get, async (req, res) => {
    try{

      let customer = peerService.getData()[0]

      if(customer != undefined) {

        peerService.notifaction(customer.id, typeClient.MOBILE , { type : '@hello' , mensagem : 'ola'})
      }


    }catch(e) {
      console.log(e)
    }


    res.send(peerService.getData())
  })

  /*
  router.get(peerPath.disconnect, async (req, res) => {

    let id = req.params.id
  
  })
*/
}


module.exports = peerServer