const mongoose = require('../../database');

const BlocoAnotacaoSchema = new mongoose.Schema({
    nome_bloco_anotacao: {
        type: String,
        required: true,
    }
});

const BlocoAnotacao = mongoose.model('BlocoAnotacao', BlocoAnotacaoSchema);

module.exports = BlocoAnotacao;