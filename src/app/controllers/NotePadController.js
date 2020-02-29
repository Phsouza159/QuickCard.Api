const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Note = require('@models/note.js')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router.js')
    , pathNotePad = pathRoute.v1.notePad

const notePadController = ((app) => {

    // authentication
    if (!pathNotePad.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
    * Route to recover all the notepads
    * @route GET /notepad
    * @group NotePad - Retrieve NotePad
    * @operationId retrieveNotePadInfo
    * @produces application/json
    * @returns {Array<Note>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathNotePad.get}`, async (req, res) => {
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
    * Route to recover from notepad by ID
    * @route GET /notepad/{id}
    * @param {string} id.path - id notepad
    * @group NotePad - Retrieve NotePad
    * @operationId retrieveNotePadInfoById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathNotePad.getById}`, async (req, res) => {
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
    * @route POST /notepad
    * @group NotePad - Create NotePad
    * @operationId createNotePad
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathNotePad.post}`, async (req, res) => {
        try {

            return res.send({ mensagem: "ok post" });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    })

    //#endregion 

    //#region OnPut
    
    /**
    * Route to update the notepad by Id
    * @route PUT /notepad/{id}
    * @param {string} id.path - id notepad
    * @group NotePad - Update NotePad
    * @operationId retrieveNoteUpdateById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.put(`${pathNotePad.put}`, async (req, res) => {
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
    * Route to delete notepad by Id
    * @route DELETE /notepad/{id}
    * @param {string} id.path - id notepad
    * @group NotePad - Delete notepad
    * @operationId retrieveNoteDeleteById
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.delete(`${pathNotePad.delete}`, async (req, res) => {
        try {

            let id = req.params.id

            return res.send({ mensagem: `ok delete id : ${id}` });

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion


    //#region Registrar rota

    app.use(`${pathNotePad.base}`, router)

    //#endregion
})

module.exports = notePadController