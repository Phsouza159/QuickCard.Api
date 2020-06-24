const mongoose = require('@dataBase')
    , { v4: uuidv4 } = require('uuid')

/**
 * @typedef NotePad
 * @property {string} _id - id notePad  
 * @property {string} name - name notePad 
 * @property {Student} student - student entity 
 * @property {Array<Note>} note - list note entity
 * @property {boolean} isActive - flag active 
 */
const NotePadSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    } ,
    name: {
        type: String,
        required: true,
    },
    student : {
        type: String,
        ref: 'Student',
    },
    note: [{
        type: String,
        ref: 'Note',
    }],
    isActive : {
        type: Boolean,
        required: true,
    }
});

const NotePad = mongoose.model('NotePad', NotePadSchema);

module.exports = NotePad;