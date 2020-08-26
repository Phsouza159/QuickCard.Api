const express = require('express')
  , authMiddleware = require('@middlewares/autenticacao')
  , Note = require('@models/note.js')
  , NotePad = require('@models/notePad')
  , Student = require('@models/student')
  , base = require('./baseController')
  , BadRequestResponse = require('@response/badRequestResponse')
  , codHttp = require('@enum/codHttp')
  , router = express.Router()
  , pathRoute = require('@config/router.js')
  , pathNote = pathRoute.v1.note


var noteController = ( function(app){

  // authentication
  if (!pathNote.allowanonymous)
    router.use(authMiddleware);

  //#region OnGet

  /**
   * Route to recover all the notes
   * @route GET /note
   * @group Note - Retrieve notes
   * @operationId retrieveNoteInfo
   * @produces application/json
   * @returns {Array<Note>} 200 - List object note
   * @returns {BadRequestResponse.model} 400 - Object bad request
   * @returns {object} 401 - Object authorization required
   * @returns {object} 500 - Objeto internal Serve Erro
   * @security JWT
   */
  router.get(`${pathNote.get}`, async (req, res) => {
    try {

      const notes = await Note.find()
      res.send(notes)

    } catch (err) {

      base.error(res, err)
    }
  });

  //#endregion

  //#region OnGet by id

  /**
  * Route to recover from note by ID
  * @route GET /note/{id}
  * @param {string} id.path - id note
  * @group Note - Retrieve note
  * @operationId retrieveNoteInfoById
  * @produces application/json
  * @returns {Note} 200 - List object note
  * @returns {BadRequestResponse.model} 400 - Object bad request
  * @returns {object} 401 - Object authorization required
  * @returns {object} 500 - Objeto internal Serve Erro
  * @security JWT
  */
  router.get(`${pathNote.getById}`, async (req, res) => {
    try {
      const id = req.params.id
      const note = await Note.findById(id)

      res.send(note)

    } catch (err) {

      base.error(res, err)
    }
  });

  //#endregion

  //#region OnPost

  /**
  * Route to create note 
  * @route POST /note
  * @group Note - Create note
  * @operationId createNote
  * @param {string} idStudent.body - id student
  * @param {string} idNotePad.body - id notePad
  * @param {string} content.body - note content
  * @param {string} name.body - name content
  * @produces application/json
  * @returns {Note} 200 - List object note
  * @returns {BadRequestResponse.model} 400 - Object bad request
  * @returns {object} 401 - Object authorization required
  * @returns {object} 500 - Objeto internal Serve Erro
  * @security JWT
  */
  router.post(`${pathNote.post}`, async (req, res) => {
    try {

      const { IdNotePad : idNotePad, Content : content, Title : title } = req.body
        , idStudent = req._user.id
        
      base.isParametreRequired({idNotePad, content, title })

      console.log(req.body)

      const notePad = await NotePad.findById(idNotePad)
        , student = await Student.findById(idStudent)

      if (!notePad)
        return res.send(codHttp.badRequest)
          .send(new BadRequestResponse('Notepad does not exist', [`Notepad does not exist by id ${idNotePad}`]))

      if (!student)
        return res.send(codHttp.badRequest)
          .send(new BadRequestResponse('student does not exist', [`student does not exist by id ${idStudent}`]))

      const note = await Note.create({ student, notePad, title, content, isActive: true });

      res.send(note)

    } catch (err) {

      base.error(res, err)
    }
  })

  //#endregion 

  //#region OnPut
  /**
   * Route to update the note by Id
   * @route PUT /note/{id}
   * @param {string} id.path - id note
   * @group Note - Retrieve note
   * @operationId retrieveNoteInfoById
   * @param {string} content.body - note content
   * @param {string} name.body - name content
   * @produces application/json
   * @returns {Note} 200 - List object note
   * @returns {BadRequestResponse.model} 400 - Object bad request
   * @returns {object} 401 - Object authorization required
   * @returns {object} 500 - Objeto internal Serve Erro
   * @security JWT
   */
  router.put(`${pathNote.put}`, async (req, res) => {
    try {

      let id = req.params.id

      const { Content : content, Title : title , IsActive : isActive} = req.body

      base.isParametreRequired({ id , content, title , isActive})

      await Note.findByIdAndUpdate(id, {
        content
        , title
        , isActive
      }, { new: true })

      res.send(await Note.findById(id));

    } catch (err) {

      base.error(res, err)
    }
  });

  //#endregion

  //#region OnDelete

  /**
   * Route to delete note by Id
   * @route DELETE /note/{id}
   * @param {string} id.path - id note
   * @group Note - Retrieve note
   * @operationId retrieveNoteInfoById
   * @produces application/json
   * @returns {Note} 200 - List object note
   * @returns {BadRequestResponse.model} 400 - Object bad request
   * @returns {object} 401 - Object authorization required
   * @returns {object} 500 - Objeto internal Serve Erro
   * @security JWT
   */
  router.delete(`${pathNote.delete}`, async (req, res) => {
    try {

      let id = req.params.id

      await Note.findByIdAndUpdate(id, {
        isActive : false
      }, { new: true })

      res.send(await Note.findById(id));

    } catch (err) {

      base.error(res, err)
    }
  });

  //#endregion

  //#region Registrar rota

  app.use(`${pathNote.base}`, router)

  //#endregion
})

module.exports = noteController
