const mongoose = require('@dataBase')
    , bcryptjs = require('bcryptjs')
    , { v4: uuidv4 } = require('uuid')

const PendingOperationsSchema = new mongoose.Schema({
    _id: {
        type: String, 
        default: uuidv4 
    } ,
    IdStudent: {
        type: String,
        require: true,
    } ,
    EntityName: {
        type: String,
        require: true,
    } ,
    TypeOperation: {
        type: String,
        require: true,
    } ,
    DateEvent: {
        type: Date,
        require: true,
    }
})


const PendingOperations = mongoose.model('PendingOperations', PendingOperationsSchema);

module.exports = PendingOperations