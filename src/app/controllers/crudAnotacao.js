const express = require('express')
 , authMiddleware = require('../middlewares/autenticacao')
 , Anotacao = require('../models/anotacao.js')
 , router = express.Router()

router.use(authMiddleware);


//#region ONPOST 
/**
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
 */
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

module.exports = app => app.use('/anotacao', router);
