const mongoose = require('../../database');
const bcryptjs = require('bcryptjs');

const EstudanteSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
    }
});

EstudanteSchema.pre('save', async function(next) {
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;

    next();
})

const Estudante = mongoose.model('Estudante', EstudanteSchema);

module.exports = Estudante;