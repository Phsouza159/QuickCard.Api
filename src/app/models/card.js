const mongoose = require('../../database')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;
/**
 * @typedef Card
 * @property {string} _id - id card  
 * @property {BlockCard.model} blockCard - blockCard entity
 * @property {string} front - front card  
 * @property {string} verse - verse card  
 * @property {boolean} isActive - flag active 
 */
const CardSchema = new mongoose.Schema({
    blockCard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlockCard',
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
    isActive: {
        type: Boolean,
        required: true
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;