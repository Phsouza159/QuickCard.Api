const express = require('express')
    , Student = require('@models/student')
    , base = require('./baseController')
    , authMiddleware = require('@middlewares/autenticacao')
    , BadRequestResponse = require('@response/badRequestResponse')
    , generetToken = require('@service/generetToken')
    , codHttp = require('@enum/codHttp')
    , pathRoute = require('@config/router.js')
    , StudentCreateResponse = require('@response/studentCreateResponse')
    , router = express.Router()
    , pathStudent = pathRoute.v1.student
    , bcrypt = require('bcryptjs')
    , BadRequestException = require('@exception/badRequestException')

const studentController = ( function(app){

    // authentication
    if (!pathStudent.allowanonymous)
        router.use(authMiddleware);

    //#region OnGet

    /**
     * Route to recover all students
     * @route GET /student
     * @group student - Retrieve students
     * @operationId retrieveStudentnfo
     * @produces application/json
     * @returns {Array<Student>} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.get(`${pathStudent.get}`, async (req, res) => {
        try {

            const studentList = await Student.find()
            res.send(studentList)

        } catch (err) {

            res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
        }
    });

    //#endregion

    //#region OnGet by id

    /**
     * Route to recover from student by ID
     * @route GET /student/{id}
     * @param {string} id.path - id student
     * @group student - Retrieve students
     * @operationId retrieveNoteInfoById
     * @produces application/json
     * @returns {Student} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.get(`${pathStudent.getById}`, async (req, res) => {
        try {

            let id = req.params.id
            let student = await Student.findById(id);

            res.send(student);
        } catch (err) {

            base.error(res, err)
        }
    });

    //#endregion

    //#region Onget by image profile

    /**
     * Route to recover image profile from student by ID
     * @route GET /student/{id}
     * @param {string} id.path - id student
     * @group student - Retrieve students
     * @operationId retrieveNoteInfoById
     * @produces application/json
     * @returns {Student} 200 - Image profile
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.get(`${pathStudent.getImgProfileById}`, async (req, res) => {
        try {

            let id = req.params.id
            let student = await Student.findById(id).select('+imgPerfil');

            if(student == null) {
                throw new BadRequestException('student does not exist' , [ 'Id invalid: ' + id])
            }

            if(student.imgPerfil == null){
                return res.status(404).send()
            }
            
            let data = student.imgPerfil.substring(student.imgPerfil.indexOf('base64,') + 'base64,'.length, student.imgPerfil.length)
            let img = Buffer.from( data, 'base64');

            console.log(data.substring(0,50))

            res.writeHead(200, {
                'Content-Type': 'image/jpg',
                'Content-Length': img.length
            });

            res.end(img)


        } catch (err) {

            base.error(res, err)
        }
    });

    //#endregion


    //#region OnPost

    /**
     * Route to create student 
     * @route POST /student
     * @group student - Retrieve students
     * @operationId createStudent
     * @produces application/json
     * @param {string} email - Student email
     * @param {string} name - Student name
     * @param {string} password - Student password
     * @returns {StudentCreateResponse.model} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.post(`${pathStudent.post}`, async (req, res) => {
        try {


            const args = { email, name, password, imgPerfil } = req.body
           
             args.isActive = true
            base.isParametreRequired({ email: args.email, name: args.name, password: args.password })

            if (await Student.findOne({ email: args.email }))
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('User already exists', [`email: ${args.email} email already registered`]))


           let student = await Student.create(args);
           
           student.password = undefined
           res.send(new StudentCreateResponse(student, generetToken({ id: student.id })))


        } catch (err) {

            base.error(res, err)
        }
    })

    //#endregion 

    //#region OnPut
    /**
     * Route to update the student by Id
     * @route PUT /student/{id}
     * @param {string} id.path - id student
     * @param {string} email - Student email
     * @param {string} name - Student name
     * @param {string} password - Student password
     * @group student - Update students
     * @operationId updateStudentInfoById
     * @produces application/json
     * @returns {Student} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.put(`${pathStudent.put}`, async (req, res) => {
        try {

            const { Email: email, Name: name, Password: password, OldPassword : oldPassword , ImgPerfil : imgPerfil} = req.body
             id = req.params.id
             student = await Student.findById(id).select('+password').select('+imgPerfil');

            base.isParametreRequired({ id: id, email, name})


            if(password != null && oldPassword != null) {
    
                if(!await bcrypt.compare(oldPassword, student.password)) {
                    throw new BadRequestException("invalid password")
                }

                student.password = password
            }  else {
                student.password = null
            }

            if(imgPerfil != null) {
                student.imgPerfil = imgPerfil 
            }

            student.email = email
            student.name = name

            student = await Student.update(student)

            student.imgPerfil = null
            return res.send(student);

        } catch (err) {

            base.error(res, err)
        }
    });

    //#endregion

    //#region OnDelete

    /**
     * Route to delete student by Id
     * @route DELETE /student/{id}
     * @param {string} id.path - id student
     * @group student - Retrieve students
     * @operationId retrieveStudentInfoById
     * @produces application/json
     * @returns {Student.model} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 401 - Object authorization required
     * @returns {object} 500 - Objeto internal Serve Erro
     * @security JWT
     */
    router.delete(`${pathStudent.delete}`, async (req, res) => {
        try {

            let id = req.params.id

            await Student.findByIdAndUpdate( id , { 
                isActive : false
            }, { new: true })

            let student = await Student.findById(id)

            return res.send(student);

        } catch (err) {

            base.error(res, err)
        }
    });

    //#endregion

    //#region Registre router

    app.use(`${pathStudent.base}`, router)

    //#endregion

})

module.exports = studentController