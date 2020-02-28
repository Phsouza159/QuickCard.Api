const mongoose = require('../../database');

const BlocoCartaoSchema = new mongoose.Schema({
    estudante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudante',
        required: true,
    },
    nome_bloco_cartao: {
        type: String,
        required: true,
    },
    cartao: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartao',
        required: true,
    }],
});

const BlocoCartao = mongoose.model('BlocoCartao', BlocoCartaoSchema);

module.exports = BlocoCartao;