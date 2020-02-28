const express = require('express');
const authMiddleware = require('../middlewares/autenticacao');

const BlocoCartao = require('../models/blocoCartao.js');

const router = express.Router();

router.use(authMiddleware);

router.post('/registroBlocoCartao', async(req, res) => {
    const { nome_bloco_cartao } = req.body;

    try { 
      if(await BlocoCartao.findOne({ nome_bloco_cartao }))
        return res.status(400).send({ error: 'Bloco cartao já existe'});

      const blococartao = await BlocoCartao.create( {...req.body, estudante: req.estudadeId });

      return res.send({ blococartao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

router.get('/listarBlocoCartoes', async (req, res) => {
    try {
      const blococartao = await BlocoCartao.find().populate('estudante');
  
      return res.send({ blococartao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar bloco cartao' });
    }
  });
  
router.get('/:BlocoCartaoId', async (req, res) => {
    try {
      const blocoCartao = await BlocoCartao.findById(req.params.BlocoCartaoId);
  
      return res.send({ blocoCartao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar bloco cartao' });
    }
  });
  
  
  router.put('/:BlocoCartaoId', async (req, res) => {
    try {
      const { nome_bloco_cartao } = req.body;
  
      const blocoCartao = await BlocoCartao.findByIdAndUpdate(req.params.BlocoCartaoId, {
        nome_bloco_cartao
      }, { new: true });
  
      return res.send({ blocoCartao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar Bloco Cartao' });
    }
  });
  
  router.delete('/:BlocoCartaoId', async (req, res) => {
    try {
      await BlocoCartao.findByIdAndRemove(req.params.BlocoCartaoId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao deletar Bloco Cartao' });
    }
  });

module.exports = app => app.use('/blocoCartao', router);
