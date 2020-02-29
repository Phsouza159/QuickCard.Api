const mongoose = require('@dataBase')
    , Schema = mongoose.Schema 
    , ObjectId = Schema.ObjectId

/**
 * @typedef Note
 * @property {String} id_estudante - id estudante 
 * @property {String} id_bloco_anotacao - id bloco anotacao 
 * @property {String} nome - nome anotacao 
 * @property {String} conteudo - conteudo anotacao 
 */
const NoteSchema = new mongoose.Schema({
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

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;