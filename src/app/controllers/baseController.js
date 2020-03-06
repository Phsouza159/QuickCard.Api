const BadRequestResponse = require('@response/badRequestResponse')
    , codHttp = require('@enum/codHttp')
    , BadRequestException = require('@exception/badRequestException')
    , CastError = require('mongoose/lib/error/cast')


const baseController = ( function(app) {

    this.app = app

    return this
})

//#region Check parameters

baseController.isParametreRequired = function(argumentosList) {


    let ags = Object.values(argumentosList)
        , key = Object.keys(argumentosList) 
        , notifications = []
        , index = 1
        , isInValid = false 

  
    ags.map( arg => {
        if(arg == undefined || arg == '') {
                
            notifications.push(`this '${key[index - 1]}' parametre is required`)
            isInValid = true      
        }
    
        index += 1
    })

    if(isInValid) {
        throw new BadRequestException('Parametres required' , notifications)
    }
}

//#endregion

//#region Handling errors

baseController.error = function( res , err ) {

    switch(true){

        case err instanceof BadRequestException:
            res.status(codHttp.badRequest)
                .send(err)

            break
        // erro cast mongodb
        case err instanceof CastError:
            res.status(codHttp.badRequest)
                .send( new BadRequestException(err.message , []))

            break

        default:
            res.status(codHttp.internalServeErro).send({ error: 'Internal error', mens : err.message })
            console.error('Internal error' , err)
            break
    }
}


//#endregion

module.exports = baseController