const express = require('express')
    , authMiddleware = require('@middlewares/autenticacao')
    , Card = require('@models/card')
    , Deck = require('@models/deck')
    , Note = require('@models/note')
    , NotePad = require('@models/notePad')
    , Student = require('@models/student')
    , BadRequestException = require('@exception/badRequestException')    
    , base = require('./baseController')
    , codHttp = require('@enum/codHttp')
    , router = express.Router()
    , pathRoute = require('@config/router')
    , pathSynchronism = pathRoute.v1.synchronism

const synchronismController = ( (app) => {

    router.get(`${pathSynchronism.get}` , async (req , res) => {
        try{
            const id = req.params.id

            const student = await Student.findById(id)

            if(!student)
                throw new BadRequestException('Student is not exist')

            const decks = await Deck.find({ 'student' : student.id })

            if(decks)
            {
                for(let i = 0; i < decks.length ; i += 1)
                {
                    let deck = decks[i]
                    deck.card = await Card.find({'deck':deck.id})
                }
            }

            const notePads = await NotePad.find({ 'student' : student.id })

            if(notePads)
            {
                for(let i = 0; i < notePads.length ; i += 1)
                {
                    let notePad = notePads[i]
                    notePad.note = await Note.find({'notePad':notePad.id})
                }
            }

            res.send({
                student
                , decks
                , notePads
            })
        }
        catch(err){
            base.error(res, err)
        }
    })

    router.post(`${pathSynchronism.post}` , async (req , res) => {
        
    })

    app.use( `${pathSynchronism.base}` , router)
})

module.exports = synchronismController