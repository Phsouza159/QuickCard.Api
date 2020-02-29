const express = require('express')
 , authMiddleware = require('@middlewares/autenticacao')
 , Note = require('@models/note.js')
 , codHttp = require('@enum/codHttp')
 , router = express.Router()
 , pathRoute = require('@config/router.js')
 , pathNote = pathRoute.v1.note


var noteController = ( (app) => {

  // authentication
  if(!pathNote.allowanonymous)
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
   * Route to create note 
   * @route POST /note
   * @group Note - Create note
   * @operationId createNote
   * @produces application/json
   * @returns {Note} 200 - List object note
   * @returns {BadRequestResponse.model} 400 - Object bad request
   * @returns {object} 401 - Object authorization required
   * @returns {object} 500 - Objeto internal Serve Erro
   * @security JWT
   */
  router.post(`${pathNote.post}` , async (req, res) => {
    try{

      return res.send({ mensagem : "ok post" });

    }catch(err){

      return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
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

      return res.send({ mensagem : `ok put id : ${id}` });

    } catch (err) {
    
      return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
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

      return res.send({ mensagem : `ok delete id : ${id}` });

    } catch (err) {
    
      return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
    }
  });

  //#endregion


  //#region Registrar rota

  app.use(`${pathNote.base}`, router)

  //#endregion

})

/*
//#region ONPOST 

/ **
 * Rota para criação de um novo cartão
 * @route POST /users
 * @group Cartão - Criar um novo cartão
 * @operationId retrieveFooInfo
 * @produces application/json
 * @param {string} id_estudante.body.required - Id do estudante
 * @param {string} nome.body.required - nome
 * @returns {Anotacao.model} 200 - Objeto anotação
 * @returns {object} 400 - Objeto anotação
 * @security JWT
 * /

router.post('/registroAnotacao', async(req, res) => {
    const { id_estudante, id_bloco_anotacao, nome, conteudo } = req.body;

    try { 
        if(await Anotacao.findOne({ nome }))
            return res.status(400).send({ error: 'Anotacao já existe'});

        const anotacao = await Anotacao.create(req.body);

        return res.send({ anotacao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

//#endregion

router.get('/listarAnotacoes', async (req, res) => {
    try {
      const anotacao = await Anotacao.find();
  
      return res.send({ anotacao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar anotacao' });
    }
  });
  
router.get('/:anotacaoId', async (req, res) => {
    try {
      const anotacao = await Anotacao.findById(req.params.anotacaoId);
  
      return res.send({ anotacao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar anotacao' });
    }
  });
  
  
  router.put('/:anotacaoId', async (req, res) => {
    try {
      const { id_estudante, id_bloco_anotacao, nome, conteudo } = req.body;
  
      const anotacao = await Anotacao.findByIdAndUpdate(req.params.anotacaoId, {
        id_estudante,
        id_bloco_anotacao,
        nome,
        conteudo
      }, { new: true });
  
      return res.send({ anotacao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar anotacao' });
    }
  });
  
  router.delete('/:anotacaoId', async (req, res) => {
    try {
      await Anotacao.findByIdAndRemove(req.params.anotacaoId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao deletar anotacao' });
    }
  });

*/

module.exports =  noteController
