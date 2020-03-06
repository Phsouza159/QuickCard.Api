const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , SynchronismServe = require('@service/synchronismService')
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
            const id = req.params.id

            var synchronismServe = new SynchronismServe()

            let response = await synchronismServe.getSync(id)

            res.send(response)
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