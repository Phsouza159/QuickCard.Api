const mongoose = require('@dataBase')
    , bcryptjs = require('bcryptjs')
    , { v4: uuidv4 } = require('uuid')

/**
 * @typedef Student
 * @property {string} _id - id student 
 * @property {string} name - name student  
 * @property {string} email - email student  
 * @property {string} password - password student
 * @property {boolean} isActive - flag active 
 */
const StudentSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    } ,
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

StudentSchema.pre('save', async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next();
})

const Student = mongoose.model('Student', StudentSchema);

Student.update = async function( args ) {


    // update to password
    if(args.password === undefined) {
        await this.findByIdAndUpdate( args.id , { 
            name : args.name
            ,email : args.email
        }, { new: true })
    }

    else {
        await this.findByIdAndUpdate( args.id , { 
            name : args.name
            ,email : args.email
            ,password : await bcryptjs.hash(args.password, 10) 
        }, { new: true })
    }

    return await this.findById(args.id)
} 


module.exports = Student;