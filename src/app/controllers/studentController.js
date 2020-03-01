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

const studentController = ((app) => {

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
            return res.send(studentList)

        } catch (err) {

            return res.status(codHttp.badRequest).send({ error: 'Erro ao carregar anotacao' });
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

            return res.send(student);
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

            const args = { email, name, password } = req.body
            
            args.isActive = true
            
            base.isParametreRequired(res, { email: args.email, name: args.name, password: args.password })

            if (await Student.findOne({ email: args.email }))
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse('User already exists', [`email: ${args.email} email already registered`]))


            let student = await Student.create(args);

            student.password = undefined

            return res.send(new StudentCreateResponse(student, generetToken({ id: student.id })))

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

            const args = { email, name, password } = req.body
            args.id = req.params.id

            base.isParametreRequired(res, { id: args.id , email: args.email, name: args.name, password: args.password })

            let student = await Student.update(args)

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