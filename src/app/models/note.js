const mongoose = require('@dataBase')
    , { v4: uuidv4 } = require('uuid')
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
    _id: { 
        type: String, 
        default: uuidv4 
    } ,
    student: {
        type: String,
        require: true,
        ref: 'Student',
    },
    notePad: {
        type: String,
        require: false,
        ref: 'NotePad',
    },
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    isActive : {
        type: Boolean,
        required: true,
    },
    isEmptyTitle : {
        type: Boolean,
        required: false,
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;