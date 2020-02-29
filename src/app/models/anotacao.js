const mongoose = require('../../database');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

/**
 * @typedef Anotacao
 * @property {String} id_estudante - id estudante 
 * @property {String} id_bloco_anotacao - id bloco anotacao 
 * @property {String} nome - nome anotacao 
 * @property {String} conteudo - conteudo anotacao 
 */
const AnotacaoSchema = new mongoose.Schema({
    id_estudante: {
        type: ObjectId,
        require: true,
    },
    id_bloco_anotacao: {
        type: ObjectId,
        require: true,
    },
    nome: {
        type: String,
        required: true,
    },
    conteudo: {
        type: String,
        required: true,
    }
});

const Anotacao = mongoose.model('Anotacao', AnotacaoSchema);

module.exports = Anotacao;