const express = require('express')
    , Deck = require('@models/deck')
    , Student = require('@models/student')
    , Card = require('@models/card')
    , base = require('./baseController')
    , authMiddleware = require('@middlewares/autenticacao')
    , BadRequestResponse = require('@response/badRequestResponse')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathDeck = pathRoute.v1.deck

const deckController = ( function(app){
    
    // authentication
    if (!pathDeck.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
    * Route to recover all decks
    * @route GET /deck
    * @group Deck - Retrieve deck
    * @operationId retrieveDeckInfo
    * @produces application/json
    * @returns {Array<Deck>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathDeck.get}`, async (req, res) => {
        try {

            const decks = await Deck.find()

            res.send(decks)

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnGet by id

    /**
    * Route to recover from deck by ID
    * @route GET /deck/{id}
    * @param {string} id.path - id deck
    * @group Deck - Retrieve deck by id
    * @operationId retrieveDeckInfoById
    * @produces application/json
    * @returns {Deck.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathDeck.getById}`, async (req, res) => {
        try {

            const id = req.params.id
                , deck = await Deck.findById(id);
                 
            
            if(deck) {
                deck.card = await Card.find({ 'deck': id})
            }

            res.send(deck)

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnPost

    /**
    * Route to create deck
    * @route POST /blackcard
    * @group Deck - create deck
    * @operationId createdDeckd
    * @param {string} idStudent.body - id student entity  
    * @param {string} name.body - name deck  
    * @produces application/json
    * @returns {Deck.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathDeck.post}`, async (req, res) => {
        try {

            const { idStudent , name } = req.body;

            base.isParametreRequired(res, {idStudent , name})

            const student = await Student.findById(idStudent)

            const deck = await Deck.create({student , name , isActive : true});

            res.send(deck);

        } catch (err) {

            base.error(res , err)
        }
    })

    //#endregion 

    //#region OnPut

    /**
    * Route to update the deck by Id
    * @route PUT /deck/{id}
    * @param {string} id.path - id deck
    * @param {string} name.body - name deck  
    * @group Deck - Update deck
    * @operationId retrieveDeckUpdateById
    * @produces application/json
    * @returns {Deck.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.put(`${pathDeck.put}`, async (req, res) => {
        try {

            let id = req.params.id
                , name = req.body.name

            base.isParametreRequired(res, {id , name})

            const deck = await Deck.findById(id);

            if(!deck)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('deck does not exist', [`id: ${id} deck does not exist`]))              
                    
                    
            await Deck.findByIdAndUpdate( id , { 
                name 
            }, { new: true })        

            return res.send(await Deck.findById(id));

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnDelete

    /**
    * Route to delete deck by Id
    * @route DELETE /deck/{id}
    * @param {string} id.path - id deck
    * @group Deck - Delete deck
    * @operationId retrieveDeckDeleteById
    * @produces application/json
    * @returns {Deck.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.delete(`${pathDeck.delete}`, async (req, res) => {
        try {

            let id = req.params.id

            const deck = await Deck.findById(id);

            if(!deck)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('deck does not exist', [`id: ${id} deck does not exist`]))              
                    
                    
            await Deck.findByIdAndUpdate( id , { 
                isActive : false 
            }, { new: true })        

            return res.send(await Deck.findById(id));

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