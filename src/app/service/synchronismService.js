const Card = require('@models/card')
    , Deck = require('@models/deck')
    , Note = require('@models/note')
    , NotePad = require('@models/notePad')
    , Student = require('@models/student')
    , BadRequestException = require('@exception/badRequestException')

const SynchronismServe = (function(){


})

SynchronismServe.prototype.getSync = async idStudent => {

    const student = await Student.findById(idStudent)

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

    return {
        student
        , decks
        , notePads
    }
}

module.exports = SynchronismServe
