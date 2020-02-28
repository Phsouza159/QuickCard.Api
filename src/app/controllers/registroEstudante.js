const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/autenticacao');

const Estudante = require('../models/estudante.js');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400,
    });
  }

router.post('/registroEstudante', async(req, res) => {
    const { email } = req.body;

    try { 
        if(await Estudante.findOne({ email }))
            return res.status(400).send({ error: 'Estudante já existe'});

        const estudante = await Estudante.create(req.body);

        estudante.senha = undefined;

        return res.send({ 
            estudante,
            token: generateToken({ id: estudante.id }),
         });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

router.post('/autenticacao', async (req, res) => {
    const { email, senha } = req.body;
  
    const estudante = await Estudante.findOne({ email }).select('+senha');
  
    if (!estudante)
      return res.status(400).send({ error: 'Estudante não encontrado' });
  
    if (!await bcrypt.compare(senha, estudante.senha))
      return res.status(400).send({ error: 'Senha inválida' });
  
    estudante.senha = undefined;
  
    res.send({
      estudante,
      token: generateToken({ id: estudante.id }),
    });
  });

module.exports = app => app.use('/authEstudante', router);