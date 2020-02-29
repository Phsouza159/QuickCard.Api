const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Note = require('@models/note.js')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router.js')
    , pathCard = pathRoute.v1.card


const cardController = (( app) => {
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
    * @returns {Array<Note>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathCard.get}`, async (req, res) => {
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
    * Route to recover from card by ID
    * @route GET /card/{id}
    * @param {string} id.path - id card
    * @group Card - Retrieve Card
    * @operationId retrieveCardInfoById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathCard.getById}`, async (req, res) => {
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
    * @route POST /card
    * @group Card - Create Card
    * @operationId createCard
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathCard.post}`, async (req, res) => {
        try {

            return res.send({ mensagem: "ok post" });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
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

            let id = req.params.id

            return res.send({ mensagem: `ok put id : ${id}` });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
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

            return res.send({ mensagem: `ok delete id : ${id}` });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion


    //#region Registrar rota

    app.use(`${pathCard.base}`, router)

    //#endregion
})

module.exports = cardController