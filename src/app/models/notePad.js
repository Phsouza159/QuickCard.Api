const mongoose = require('@dataBase');

/**
 * @typedef NotePad
 * @property {string} _id - id notePad  
 * @property {string} name - name notePad 
 * @property {Student} student - student entity 
 * @property {Array<Note>} note - list note entity
 * @property {boolean} isActive - flag active 
 */
const NotePadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    note: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    }],
    isActive : {
        type: Boolean,
        required: true,
    }
});

const NotePad = mongoose.model('NotePad', NotePadSchema);

module.exports = NotePad;