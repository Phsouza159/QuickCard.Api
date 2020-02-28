const express = require('express');
const authMiddleware = require('../middlewares/autenticacao');

const Estudante = require('../models/estudante.js');

const router = express.Router();

router.use(authMiddleware);

router.get('/listarEstudantes', async (req, res) => {
    try {
      const estudante = await Estudante.find();
  
      return res.send({ estudante });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar estudante' });
    }
  });
  
router.get('/:estudanteId', async (req, res) => {
    try {
      const estudante = await Estudante.findById(req.params.estudanteId);
  
      return res.send({ estudante });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao carregar estudante' });
    }
  });
  
  
  router.put('/:estudanteId', async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
  
      const estudante = await Estudante.findByIdAndUpdate(req.params.estudanteId, {
        nome,
        email,
        senha
      }, { new: true });
  
      return res.send({ estudante });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao atualizar estudante' });
    }
  });
  
  router.delete('/:estudanteId', async (req, res) => {
    try {
      await Estudante.findByIdAndRemove(req.params.estudanteId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao deletar estudante' });
    }
  });
  

module.exports = app => app.use('/estudante', router);
