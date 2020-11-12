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
    , moment = require('moment')
    , { peerService , typeClient } = require('@peerServer/peerService')

const deckController = ( function(app){
    
    // authentication
    if (!pathDeck.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet Info Decks

/**
    * Route to recover decks info
    * @route GET /deck/infoDecks
    * @param {string} id.path - id deck
    * @group Deck - Retrieve info decks 
    * @operationId retrieveDecks
    * @produces application/json
    * @returns {Any} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
   router.get(`${pathDeck.getInfoDecks}`, async (req, res) => {
        try {

            const user = req._user
                , decks = await Deck.find({ 'student' : user.id })
                , deckInfo = []
                , isNextVisibleCard = (card) => {

                    let date = moment(card.dateNextView)
                    , nowDate = moment()

                    // true - data is past
                    return nowDate > date
                }

            if(decks)
            {
                for(let i = 0; i < decks.length ; i += 1)
                {
                    let deck = decks[i]
                        , cards = await Card.find({'deck' : deck.id})
                        , cardsInfo = []

                    if(!deck.isActive)
                        continue
                        
                    cards.map( card => {
                        if(card.isActive) {
                            cardsInfo.push({
                                isReviewed : card.isReviewed
                                , dateNextView : card.dateNextView
                            })
                        }
                    })

                    deckInfo.push({
                        _id : deck.id
                        , name : deck.name
                        , count : cardsInfo.length
                        , isReviewed : cardsInfo.filter( e => e.isReviewed).length
                        , isNotReviewed : cardsInfo.filter( e => !e.isReviewed).length
                        , isCardsReviewMoment : cardsInfo.filter( e => !e.isReviewed).filter( e => isNextVisibleCard(e)).length
                        , isActive : true
                    })
                }
            }

            res.send( deckInfo )


        } catch (err) {

            base.error(res , err)
        }
    })


    //#endregion


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

            let id = req._user.id

            const decks = await Deck.find({ 'student': id})
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
    * @route POST /deck
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
            const { Name , Id } = req.body
                , idStudent = req._user.id

            console.log(req.body)


            base.isParametreRequired({idStudent , Name, Id})

            const student = await Student.findById(idStudent)

            const deck = await Deck.create({student , name : Name, _id : Id, isActive : true})

            res
                .peerMiddlerware()
                .pendenciesMiddleware()
                .send(deck)

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

            const { Id: id , Name: name , IsActive : isActive } = req.body

            console.log(req.body)

            peerService.notifaction( req._user.id, typeClient.MOBILE , {
                type : '@deck/update' ,
                playord : { mensagem : 'update to deck'}
            })


            base.isParametreRequired({id , name , isActive})

            const deck = await Deck.findById(id);

            if(!deck)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('deck does not exist', [`id: ${id} deck does not exist`]))              
                    
            await Deck.findByIdAndUpdate( id , { 
                name 
                , isActive
            }, { new: true })        

            res.peerMiddlerware()
               .pendenciesMiddleware()
               .send(await Deck.findById(id))

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

            res.send(await Deck.findById(id));

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