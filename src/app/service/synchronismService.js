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

    let _decks = await Deck.find({ 'student' : student.id })
        , decks =  []

        _decks.map( deck => {
            if(deck.isActive) {

                decks.push(deck)
            }
        })

    if(decks.length > 0)
    {
        let cards = []

        for(let i = 0; i < decks.length ; i += 1)
        {
            let deck = decks[i]
                , _cards = await Card.find({'deck':deck.id})
                
                _cards.map( card => {
                    if(card.isActive) {
                        cards.push(card)
                    }
                })

            deck.card = cards
            cards = []
        }
    }

    let _notePads = await NotePad.find({ 'student' : student.id })
        , notePads = []

        _notePads.map( notePad => {
            if(notePad.isActive){
                notePads.push(notePad)
            }
        })

    if(notePads.length > 0)
    {
        let notes = []

        for(let i = 0; i < notePads.length ; i += 1)
        {
            let notePad = notePads[i]
                , _note = await Note.find({'notePad':notePad.id})

                _note.map( note => {
                    if(note.isActive) {
                        notes.push(note)
                    }
                })
            notePad.note = notes
            notes = []
        }
    }

    return {
        student
        , decks
        , notePads
    }
}

module.exports = SynchronismServe
