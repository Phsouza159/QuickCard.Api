const express = require('express')
    , BlockCard = require('@models/blockCard')
    , Student = require('@models/student')
    , Card = require('@models/card')
    , base = require('./baseController')
    , authMiddleware = require('@middlewares/autenticacao')
    , BadRequestResponse = require('@response/badRequestResponse')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathBlockCard = pathRoute.v1.blockCard

const blockCardController = ( (app) => {
    
    // authentication
    if (!pathBlockCard.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
    * Route to recover all block cards
    * @route GET /blockcard
    * @group BlockCard - Retrieve block card
    * @operationId retrieveBlockCardInfo
    * @produces application/json
    * @returns {Array<BlockCard>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathBlockCard.get}`, async (req, res) => {
        try {

            const blockcards = await BlockCard.find()

            res.send(blockcards)

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnGet by id

    /**
    * Route to recover from block card by ID
    * @route GET /blockcard/{id}
    * @param {string} id.path - id block card
    * @group BlockCard - Retrieve block card by id
    * @operationId retrieveBlockCardInfoById
    * @produces application/json
    * @returns {BlockCard.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathBlockCard.getById}`, async (req, res) => {
        try {

            const id = req.params.id
                , blockcard = await BlockCard.findById(id);
                 
            
            if(blockcard) {
                blockcard.card = await Card.find({ 'blockCard': id})
            }

            res.send(blockcard)

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnPost

    /**
    * Route to create block card
    * @route POST /blackcard
    * @group BlockCard - create block card
    * @operationId createdBlockCardd
    * @param {string} idStudent.body - id student entity  
    * @param {string} name.body - name block card  
    * @produces application/json
    * @returns {BlockCard.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathBlockCard.post}`, async (req, res) => {
        try {

            const { idStudent , name } = req.body;

            base.isParametreRequired(res, {idStudent , name})

            const student = await Student.findById(idStudent)

            const blockCard = await BlockCard.create({student , name , isActive : true});

            res.send(blockCard);

        } catch (err) {

            base.error(res , err)
        }
    })

    //#endregion 

    //#region OnPut

    /**
    * Route to update the block card by Id
    * @route PUT /blockcard/{id}
    * @param {string} id.path - id block card
    * @param {string} name.body - name block card  
    * @group BlockCard - Update block card
    * @operationId retrieveBlockCardUpdateById
    * @produces application/json
    * @returns {BlockCard.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.put(`${pathBlockCard.put}`, async (req, res) => {
        try {

            let id = req.params.id
                , name = req.body.name

            base.isParametreRequired(res, {id , name})

            const blockcard = await BlockCard.findById(id);

            if(!blockcard)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('Block card does not exist', [`id: ${id} block card does not exist`]))              
                    
                    
            await BlockCard.findByIdAndUpdate( id , { 
                name 
            }, { new: true })        

            return res.send(await BlockCard.findById(id));

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region OnDelete

    /**
    * Route to delete block card by Id
    * @route DELETE /blockcard/{id}
    * @param {string} id.path - id block card
    * @group BlockCard - Delete block card
    * @operationId retrieveBlockCardDeleteById
    * @produces application/json
    * @returns {BlockCard.model} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.delete(`${pathBlockCard.delete}`, async (req, res) => {
        try {

            let id = req.params.id

            const blockcard = await BlockCard.findById(id);

            if(!blockcard)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('Block card does not exist', [`id: ${id} block card does not exist`]))              
                    
                    
            await BlockCard.findByIdAndUpdate( id , { 
                isActive : false 
            }, { new: true })        

            return res.send(await BlockCard.findById(id));

        } catch (err) {

            base.error(res , err)
        }
    });

    //#endregion

    //#region Registrar rota

    app.use(`${pathBlockCard.base}`, router)

    //#endregion
})

module.exports = blockCardController