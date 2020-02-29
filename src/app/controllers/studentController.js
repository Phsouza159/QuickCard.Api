const express = require('express')
 , authMiddleware = require('@middlewares/autenticacao')
 , codHttp = require('@enum/codHttp')
 , router = express.Router()
 , pathRoute = require('@config/router.js')
 , pathStudent = pathRoute.v1.student
 
const studentController = ( (app) => {
   
    // authentication
    if(!pathStudent.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
     * Route to recover all students
     * @route GET /student
     * @group student - Retrieve students
     * @operationId retrieveStudentnfo
     * @produces application/json
     * @returns {Array<Note>} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.get(`${pathStudent.get}`, async (req, res) => {
        try {
        
        return res.send({ mensagem : "ok get" });

        // const anotacao = await Anotacao.find();
        // return res.send({ anotacao });
        
        } catch (err) {
        
        return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion


    //#region OnGet by id

    /**
     * Route to recover from student by ID
     * @route GET /student/{id}
     * @param {string} id.path - id student
     * @group student - Retrieve students
     * @operationId retrieveNoteInfoById
     * @produces application/json
     * @returns {Note} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.get(`${pathStudent.getById}`, async (req, res) => {
        try {
        
        let id = req.params.id

        return res.send({ mensagem : `ok get id : ${id}` });

        // const anotacao = await Note.find();
        // return res.send({ anotacao });
        
        } catch (err) {
        
        return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion

    //#region OnPost
    
    /**
     * Route to create student 
     * @route POST /student
     * @group student - Retrieve students
     * @operationId createStudent
     * @produces application/json
     * @returns {Note} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.post(`${pathStudent.post}` , async (req, res) => {
        try{

        return res.send({ mensagem : "ok post" });

        }catch(err){

        return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    })

    //#endregion 

    //#region OnPut
    /**
     * Route to update the student by Id
     * @route PUT /student/{id}
     * @param {string} id.path - id student
     * @group student - Retrieve students
     * @operationId retrieveStudentInfoById
     * @produces application/json
     * @returns {Note} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.put(`${pathStudent.put}`, async (req, res) => {
        try {
        
        let id = req.params.id

        return res.send({ mensagem : `ok put id : ${id}` });

        } catch (err) {
        
        return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion

    //#region OnDelete

    /**
     * Route to delete student by Id
     * @route DELETE /student/{id}
     * @param {string} id.path - id student
     * @group student - Retrieve students
     * @operationId retrieveStudentInfoById
     * @produces application/json
     * @returns {Note} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.delete(`${pathStudent.delete}`, async (req, res) => {
        try {
        
        let id = req.params.id

        return res.send({ mensagem : `ok delete id : ${id}` });

        } catch (err) {
        
        return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion


    //#region Registrar rota

    app.use(`${pathStudent.base}`, router)

    //#endregion

})

module.exports = studentController