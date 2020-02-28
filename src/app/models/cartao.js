const mongoose = require('../../database');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const CartaoSchema = new mongoose.Schema({
    blocoCartao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlocoCartao',
        required: true,
    },
    frente: {
        type: String,
        required: true,
    },
    verso: {
        type: String,
        required: true,
    }
});

const Cartao = mongoose.model('Cartao', CartaoSchema);

module.exports = Cartao;