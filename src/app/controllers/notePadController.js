const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Note = require('@models/note')
    , NotePad = require('@models/notePad')
    , Student = require('@models/student')
    , base = require('./baseController')
    , BadRequestResponse = require('@response/badRequestResponse')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathNotePad = pathRoute.v1.notePad

const notePadController = ( function(app){

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
    * @returns {Array<NotePad>} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathNotePad.get}`, async (req, res) => {
        try {

            const notePads = await NotePad.find()

            res.send(notePads);

        } catch (err) {

            base.error(res, err)
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
    * @returns {NotePad} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.get(`${pathNotePad.getById}`, async (req, res) => {
        try {

            let id = req.params.id

            const notePad = await NotePad.findById(id)

            if(notePad)
                notePad.note = Note.find({'note' : id})

            res.send(notePad)

        } catch (err) {

            base.error(res, err)
        }
    });

    //#endregion

    //#region OnPost

    /**
    * Route to create notepad
    * @route POST /notepad
    * @group NotePad - Create NotePad
    * @operationId createNotePad
    * @param {string} idStudent.body - id student
    * @param {string} name.body - name notePad
    * @produces application/json
    * @returns {Note} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.post(`${pathNotePad.post}`, async (req, res) => {
        try {

            const { Id : id , Name: name } = req.body
                , idStudent = req._user.id

            console.log(req.body)

            base.isParametreRequired({ id, idStudent, name})
            
            const student = await Student.findById(idStudent)

            if(!student)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('student does not exist' , [`student does not exist by id ${idStudent}`]))

            const notePad = await NotePad.create({id , student , name , isActive : true});

            res.send(notePad)

        } catch (err) {

            base.error(res, err)
        }
    })

    //#endregion 

    //#region OnPut

    /**
    * Route to update the notepad by Id
    * @route PUT /notepad/{id}
    * @group NotePad - Update NotePad
    * @param {string} id.path - id notepad
    * @param {string} name.body - name notePad
    * @operationId retrieveNoteUpdateById
    * @produces application/json
    * @returns {NotePad} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.put(`${pathNotePad.put}`, async (req, res) => {
        try {

            const id = req.params.id
            const { Name : name } = req.body

            base.isParametreRequired({name})

            const notePad = await NotePad.findById(id)

            if(!notePad)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('Notepad does not exist' , [`Notepad does not exist by id ${id}`]))

            await NotePad.findByIdAndUpdate( id , { 
                name : name
            }, { new: true })


            res.send(await NotePad.findById(id));

        } catch (err) {

            base.error(res , err)
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
    * @returns {NotePad} 200 - List object note
    * @returns {BadRequestResponse.model} 400 - Object bad request
    * @returns {object} 401 - Object authorization required
    * @returns {object} 500 - Objeto internal Serve Erro
    * @security JWT
    */
    router.delete(`${pathNotePad.delete}`, async (req, res) => {
        try {
            
            const id = req.params.id

            const notePad = await NotePad.findById(id)

            if(!notePad)
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('Notepad does not exist' , [`Notepad does not exist by id ${id}`]))

            await NotePad.findByIdAndUpdate( id , { 
                isActive : false
            }, { new: true })


            res.send(await NotePad.findById(id));


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