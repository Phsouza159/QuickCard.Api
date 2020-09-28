const Student = require('@models/student')
  , PendingOperations = require('@models/pendingOperations')
  , Deck = require('@models/deck')
  , Card = require('@models/card')
  , NotePad = require('@models/notePad')
  , Note = require('@models/note')

class pendingService {

    static async getPendings(user) {
        let data = await PendingOperations.find({ IdStudent : user.id})
        , response = []

        for(let i = 0; i < data.length; i += 1) {

            let item = data[i]
              , source = {}

            switch(item.EntityName){
                case "deck":
                    source = await Deck.findById(item._id)
                    break

                case "card":
                    source = await Card.findById(item._id)
                    break

                case "notepad":
                    source = await NotePad.findById(item._id)
                    break

                case "note":
                    source = await Note.findById(item._id)
                    break
            }

            response.push({ 
              target : item
              , source 
            })
        }

        return response
    }

    static async deletePendings(user) {
       let data = await PendingOperations.deleteMany({ IdStudent : user.id})
    }
}

module.exports = pendingService