const express = require('express')
 , Note = require('@models/note.js')
 , codHttp = require('@enum/codHttp')
 , router = express.Router()
 , pathRoute = require('@config/router.js')
 , pathlogin = pathRoute.v1.login

 const loginController = ( (app) => {

    //#region OnPost

    /**
     * Route to authentication
     * @route POST /login
     * @group Login 
     * @operationId loginInfo
     * @produces application/json
     * @returns {object} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 500 - Objeto internal Serve Erro
     */
    router.post(`${pathlogin.post}` , async (req , res) => {
        try{

            res.send({ mensagem : "ok post"})

        }
        catch(err){

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    })

    //#endregion

    //#region Registrar rota

    app.use(`${pathlogin.base}`, router)

    //#endregion
 })


 module.exports = loginController