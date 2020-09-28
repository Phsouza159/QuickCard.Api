const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , SynchronismServe = require('@service/synchronismService')
    , PendingService = require('@service/pendingService')
    , BadRequestException = require('@exception/badRequestException')    
    , base = require('./baseController')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathSynchronism = pathRoute.v1.synchronism

const synchronismController = ( (app) => {

    // authentication
    if (!pathSynchronism.allowanonymous)
        router.use(authMiddleware);

    router.get(`${pathSynchronism.get}` , async (req , res) => {
        try{
            const user = req._user

            if(user != undefined) {
                var synchronismServe = new SynchronismServe()

                let response = await synchronismServe.getSync(user.id)

                PendingService.deletePendings(user)
    
                return res.send(response)
            }

            throw BadRequestException('Invalid user for syronism');
        }
        catch(err){
            base.error(res, err)
        }
    })

    router.post(`${pathSynchronism.post}` , async (req , res) => {
        
    })

    app.use( `${pathSynchronism.base}` , router)
})

module.exports = synchronismController