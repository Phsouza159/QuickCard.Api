const BadRequestResponse = require('@response/badRequestResponse')
    , codHttp = require('@enum/codHttp')
    , BadRequestException = require('@exception/badRequestException')


const baseController = ( function(app) {

    this.app = app

    return this
})

//#region Check parameters

baseController.isParametreRequired = function( res , argumentosList) {


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

        const response = new BadRequestResponse('Parametres required' , notifications)

        res.status(codHttp.badRequest).send(response)

        throw new BadRequestException( response.message )
    }
}

//#endregion


//#region Handling errors

baseController.error = function( res , err ) {

    if(err instanceof BadRequestException){
        return console.log(err)
    }

    res.status(codHttp.internalServeErro).send({ error: 'Internal error', mens : err.message });
    console.error('Erro interno' , err)
}


//#endregion

module.exports = baseController