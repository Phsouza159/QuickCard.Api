const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Note = require('@models/note.js')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router.js')
    , pathDeck = pathRoute.v1.deck

const deckController = ((app) => {
    // authentication
    if (!pathDeck.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
    * Route to recover all decks
    * @route GET /deck
    * @group Deck - Retrieve Deck
    * @operationId retrieveDeckInfo
    * @produces application/json
    * @returns {Array<Note>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathDeck.get}`, async (req, res) => {
        try {

            return res.send({ mensagem: "ok get" });

            // const anotacao = await Anotacao.find();
            // return res.send({ anotacao });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion

    //#region OnGet by id

    /**
    * Route to recover from deck by ID
    * @route GET /deck/{id}
    * @param {string} id.path - id deck
    * @group Deck - Retrieve Deck
    * @operationId retrieveDeckInfoById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathDeck.getById}`, async (req, res) => {
        try {

            let id = req.params.id

            return res.send({ mensagem: `ok get id : ${id}` });

            // const anotacao = await Note.find();
            // return res.send({ anotacao });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion

    //#region OnPost

    /**
    * Route to create notepad
    * @route POST /deck
    * @group Deck - Create Deck
    * @operationId createDeck
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathDeck.post}`, async (req, res) => {
        try {

            return res.send({ mensagem: "ok post" });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    })

    //#endregion 

    //#region OnPut

    /**
    * Route to update the deck by Id
    * @route PUT /deck/{id}
    * @param {string} id.path - id deck
    * @group Deck - Update Deck
    * @operationId retrieveDeckUpdateById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.put(`${pathDeck.put}`, async (req, res) => {
        try {

            let id = req.params.id

            return res.send({ mensagem: `ok put id : ${id}` });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
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
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.delete(`${pathDeck.delete}`, async (req, res) => {
        try {

            let id = req.params.id

            return res.send({ mensagem: `ok delete id : ${id}` });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion


    //#region Registrar rota

    app.use(`${pathDeck.base}`, router)

    //#endregion
})


module.exports = deckController