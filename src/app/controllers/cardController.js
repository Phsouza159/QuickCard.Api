const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Card = require('@models/card')
    , Deck = require('@models/deck')
    , BadRequestResponse = require('@response/badRequestResponse')
    , base = require('./baseController')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathCard = pathRoute.v1.card


const cardController = ( function(app) {
    
    // authentication
    if (!pathCard.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
    * Route to recover all cards
    * @route GET /card
    * @group Card - Retrieve Card
    * @operationId retrieveCardInfo
    * @produces application/json
    * @returns {Array<Card>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathCard.get}`, async (req, res) => {
        try {

            const cards = await Card.find()

            res.send(cards)

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnGet by id

    /**
    * Route to recover from card by ID
    * @route GET /card/{id}
    * @param {string} id.path - id card
    * @group Card - Retrieve Card
    * @operationId retrieveCardInfoById
    * @produces application/json
    * @returns {Card} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathCard.getById}`, async (req, res) => {
        try {

            const id = req.params.id
                , card = await Card.findById(id);

            res.send(card)

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnPost

    /**
    * Route to create notepad
    * @route POST /card
    * @group Card - Create Card
    * @operationId createCard
    * @param {string} idNotePad.body - id NotePad entity  
    * @param {string} front.body - front card  
    * @param {string} verse.body - verse card  
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathCard.post}`, async (req, res) => {
        try {
            const { 
                Id : _id 
                , IdDeck : idDeck 
                , Front : front 
                , Verse : verse
                , IsReviewed : isReviewed
                , NumGoodCount : numGoodCount
                , NumEasyCount : numEasyCount
                , NumDifficultCount : numDifficultCount
                , DateNextView : dateNextView
                , DateLastView : dateLastView
                , DisplayDeadline : displayDeadline
                , CodEnumHit : codEnumHit
             } = req.body; 

            console.log(req.body)

            base.isParametreRequired({ 
                _id , idDeck, front, verse, isReviewed, numGoodCount
                , numEasyCount, numDifficultCount, dateNextView, dateLastView , displayDeadline, codEnumHit
            })

            const deck = await Deck.findById(idDeck)

            if(!deck)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('block card does not exist', [`id block card: ${idDeck}`]))

            const card = await Card.create({  
                _id, deck, idDeck, front, verse, isReviewed, numGoodCount
                , numEasyCount, numDifficultCount, dateNextView, dateLastView, displayDeadline, codEnumHit, isActive : true
            });

            res.send(card);

        } catch (err) {

            base.error(res , err)
        }
    })

    //#endregion 

    //#region OnPut

    /**
    * Route to update the card by Id
    * @route PUT /card/{id}
    * @param {string} id.path - id card
    * @group Card - Update Card
    * @operationId retrieveCardUpdateById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.put(`${pathCard.put}`, async (req, res) => {
        try {
            const { 
                Id: id 
                , IdDeck : idDeck 
                , Front : front 
                , Verse : verse
                , IsReviewed : isReviewed
                , IsActive : isActive
                , NumGoodCount : numGoodCount
                , NumEasyCount : numEasyCount
                , NumDifficultCount : numDifficultCount
                , DateNextView : dateNextView
                , DateLastView : dateLastView
                , DisplayDeadline : displayDeadline
                , CodEnumHit : codEnumHit
             } = req.body; 

            console.log(req.body)

            base.isParametreRequired({ 
                id , idDeck, front, verse, isReviewed, numGoodCount
                , numEasyCount, numDifficultCount, dateNextView, dateLastView, displayDeadline, codEnumHit, isActive
            })

            await Card.findByIdAndUpdate( id , { 
                idDeck, front, verse, isReviewed, numGoodCount
                , numEasyCount, numDifficultCount, dateNextView, dateLastView, displayDeadline, codEnumHit, isActive
            }, { new: true })  

            res.send(await Card.findById(id));

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnDelete

    /**
    * Route to delete card by Id
    * @route DELETE /card/{id}
    * @param {string} id.path - id card
    * @group Card - Delete card
    * @operationId retrieveCardDeleteById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.delete(`${pathCard.delete}`, async (req, res) => {
        try {

            let id = req.params.id

            res.send({ mensagem: `ok delete id : ${id}` });

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region Registrar rota

    app.use(`${pathCard.base}`, router)

    //#endregion
})

module.exports = cardController