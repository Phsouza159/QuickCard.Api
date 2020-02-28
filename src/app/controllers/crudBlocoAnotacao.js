const express = require('express');
const authMiddleware = require('../middlewares/autenticacao');

const BlocoAnotacao = require('../models/blocoAnotacao.js');

const router = express.Router();

router.use(authMiddleware);

router.post('/registroBlocoAnotacao', async(req, res) => {
    const { nome_bloco_anotacao } = req.body;

    try { 
        if(await BlocoAnotacao.findOne({ nome_bloco_anotacao }))
            return res.status(400).send({ error: 'Bloco anotacao já existe'});

        const blocoAnotacao = await BlocoAnotacao.create(req.body);

        return res.send({ blocoAnotacao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

router.get('/listarBlocoAnotacoes', async (req, res) => {
    try {
      const blocoAnotacao = await BlocoAnotacao.find();
  
      return res.send({ blocoAnotacao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar bloco anotacao' });
    }
  });
  
router.get('/:BlocoAnotacaoId', async (req, res) => {
    try {
      const blocoAnotacao = await BlocoAnotacao.findById(req.params.BlocoAnotacaoId);
  
      return res.send({ blocoAnotacao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar bloco anotacao' });
    }
  });
  
  
  router.put('/:BlocoAnotacaoId', async (req, res) => {
    try {
      const { nome_bloco_anotacao } = req.body;
  
      const blocoAnotacao = await BlocoAnotacao.findByIdAndUpdate(req.params.BlocoAnotacaoId, {
        nome_bloco_anotacao
      }, { new: true });
  
      return res.send({ blocoAnotacao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar Bloco Anotacao' });
    }
  });
  
  router.delete('/:BlocoAnotacaoId', async (req, res) => {
    try {
      await BlocoAnotacao.findByIdAndRemove(req.params.BlocoAnotacaoId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao deletar Bloco Anotacao' });
    }
  });

module.exports = app => app.use('/blocoAnotacao', router);
