const mongoose = require('@dataBase')
    , { v4: uuidv4 } = require('uuid')

/**
 * @typedef Deck
 * @property {string} _id - id deck 
 * @property {Student.model} student - Student entity
 * @property {string} name - name deck  
 * @property {Array<Card>} card - list card entity  
 * @property {boolean} isActive - flag active 
 */
const DeckdSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    } ,
    student: {
        type: String,
        ref: 'Student',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    card: [{
        type: String,
        ref: 'Card',
    }],
    isActive: {
        type: Boolean,
        required: true
    }
});

const Deck = mongoose.model('Deck', DeckdSchema);

module.exports = Deck;