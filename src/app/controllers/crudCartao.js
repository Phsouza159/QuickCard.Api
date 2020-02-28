const express = require('express');
const authMiddleware = require('../middlewares/autenticacao');

const Cartao = require('../models/cartao.js');

const router = express.Router();

router.use(authMiddleware);

router.post('/registroCartao', async(req, res) => {
    const { id_estudante, id_bloco_cartao, frente, verso } = req.body;

    try { 
        if(await Cartao.findOne({ frente }))
            return res.status(400).send({ error: 'Cartao já existe'});

        const cartao = await Cartao.create(req.body);

        return res.send({ cartao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

router.get('/listarCartoes', async (req, res) => {
    try {
      const cartao = await Cartao.find();
  
      return res.send({ cartao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar cartao' });
    }
  });
  
router.get('/:cartaoId', async (req, res) => {
    try {
      const cartao = await Cartao.findById(req.params.cartaoId);
  
      return res.send({ cartao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar cartao' });
    }
  });
  
  
  router.put('/:cartaoId', async (req, res) => {
    try {
      const { id_estudante, id_bloco_cartao, frente, verso } = req.body;
  
      const cartao = await Cartao.findByIdAndUpdate(req.params.cartaoId, {
        id_estudante,
        id_bloco_cartao,
        frente,
        verso
      }, { new: true });
  
      return res.send({ cartao });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar cartao' });
    }
  });
  
  router.delete('/:cartaoId', async (req, res) => {
    try {
      await Cartao.findByIdAndRemove(req.params.cartaoId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao deletar cartao' });
    }
  });

module.exports = app => app.use('/cartao', router);
