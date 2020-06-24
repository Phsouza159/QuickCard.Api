const mongoose = require('@dataBase')
    , { v4: uuidv4 } = require('uuid')
/**
 * @typedef Card
 * @property {string} _id - id card  
 * @property {Deck.model} deck - deck entity
 * @property {string} front - front card  
 * @property {string} verse - verse card  
 * @property {boolean} isActive - flag active 
 */
const CardSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    } ,
    deck: {
        type: String,
        ref: 'Deck',
        required: true,
    },
    front: {
        type: String,
        required: true,
    },
    verse: {
        type: String,
        required: true,
    }, 
    dateLastView: {
        type: Date,
        required: false,
    },
    dateNextView: {
        type: Date,
        required: false,
    },
    numDifficultCount: {
        type: Number,
        required: false,
    },
    numGoodCount: {
        type: Number,
        required: false,
    },
    isReviewed: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;