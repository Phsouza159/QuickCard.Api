const mongoose = require('@dataBase');

/**
 * @typedef Deck
 * @property {string} _id - id deck 
 * @property {Student.model} student - Student entity
 * @property {string} name - name deck  
 * @property {Array<Card>} card - list card entity  
 * @property {boolean} isActive - flag active 
 */
const DeckdSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    card: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }],
    isActive: {
        type: Boolean,
        required: true
    }
});

const Deck = mongoose.model('Deck', DeckdSchema);

module.exports = Deck;