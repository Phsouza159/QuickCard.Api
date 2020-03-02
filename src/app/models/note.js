const mongoose = require('@dataBase')

/**
 * @typedef Note
 * @property {string} _id - id note  
 * @property {Student.model} student - student entity 
 * @property {NotePad.model} notePad - notePad entity 
 * @property {String} name - name note 
 * @property {String} content - content note 
 * @property {boolean} isActive - flag active 
 */
const NoteSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Student',
    },
    notePad: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'NotePad',
    },
    nome: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isActive : {
        type: Boolean,
        required: true,
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;