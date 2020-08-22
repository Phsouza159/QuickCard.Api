const express = require('express')
    , Deck = require('@models/deck')
    , base = require('./baseController')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathDeck = pathRoute.home

const deckController = ( function(app){
    

    //#region OnGet

    /**
    */
    router.get(`${pathDeck.get}`, async (req, res) => {
        try {

            res.send({ home : 'QuickCard.Api'})

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion
    
    //#region Registrar rota

    app.use(`${pathDeck.base}`, router)

    //#endregion
})

module.exports = deckController