const mongoose = require('@dataBase');

/**
 * @typedef BlockCard
 * @property {string} _id - id bloco card 
 * @property {Student.model} student - Student entity
 * @property {string} name - name block card  
 * @property {Array<Card>} card - list card entity  
 * @property {boolean} isActive - flag active 
 */
const BlockCardSchema = new mongoose.Schema({
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

const BlockCard = mongoose.model('BlockCard', BlockCardSchema);

module.exports = BlockCard;