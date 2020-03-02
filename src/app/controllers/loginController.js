const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Student = require('@models/student')
    , base = require('./baseController')
    , bcrypt = require('bcryptjs')
    , BadRequestResponse = require('@response/badRequestResponse')
    , generetToken = require('@service/generetToken')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router.js')
    , pathlogin = pathRoute.v1.login

 const loginController = ( function(app) {

    // authentication
    if(!pathlogin.allowanonymous)
        router.use(authMiddleware);

    //#region OnPost

    /**
     * Route to authentication
     * @route POST /login
     * @group Login 
     * @operationId loginInfo
     * @produces application/json
     * @returns {StudentCreateResponse.model} 200 - List object note
     * @returns {BadRequestResponse.model} 400 - Object bad request
     * @returns {object} 500 - Objeto internal Serve Erro
     */
    router.post(`${pathlogin.post}` , async (req , res) => {
        try{

            const args = { email, password } = req.body
                , student = await Student.findOne({ email : args.email }).select('+password');

            base.isParametreRequired(res, { email: args.email, password: args.password })

            if (!student)
                return res.status(codHttp.badRequest)
                    .send( new BadRequestResponse(`Invalid password or email`));

            if(!await bcrypt.compare(args.password, student.password))
                return res.status(codHttp.badRequest)
                    .send(new BadRequestResponse(`Invalid password or email`));

            student.password = undefined

            res.send({
                student,
                token: generetToken({ id: student.id }),
            });

        }
        catch(err){

            base.error(res, err)
        }
    })

    //#endregion

    //#region Registrar rota

    app.use(`${pathlogin.base}`, router)

    //#endregion
 })


 module.exports = loginController