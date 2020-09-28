const express = require('express')
    , Student = require('@models/student')
    , PendingOperations = require('@models/pendingOperations')
    , Deck = require('@models/deck')
    , Card = require('@models/card')
    , base = require('./baseController')
    , authMiddleware = require('@middlewares/autenticacao')
    , BadRequestResponse = require('@response/badRequestResponse')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathPending = pathRoute.v1.pending
    , { peerService , typeClient } = require('@peerServer/peerService')
    , pendingService = require('@service/pendingService')


const pendingController = ( function(app){
    
    // authentication
    if (!pathPending.allowanonymous)
        router.use(authMiddleware)
        
    router.get(`${pathPending.get}`, async (req, res) => {
        try {

            const user = req._user

            let date = await pendingService.getPendings(user)
            
            res.send(date)
           
        } catch (err) {

            base.error(res , err)
        }
    })     

    router.delete(`${pathPending.get}`, async (req, res) => {
        try {

            const user = req._user

            await pendingService.deletePendings(user)
            
            res.send({})
           
        } catch (err) {

            base.error(res , err)
        }
    })     

    //#region Registrar rota

    app.use(`${pathPending.base}`, router)

    //#endregion
})

module.exports = pendingController