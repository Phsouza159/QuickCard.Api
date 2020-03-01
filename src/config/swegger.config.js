const expressSwagger = require('express-swagger-generator')
    , options = {
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            basePath: '/api/v1',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: `${__dirname}/../../src/`, //app absolute path
        //Path to the API handle folder
        files: [
             './app/**/*.js'
        ]
    }

    , registreSwegger = ( app ) => {
        try{
            expressSwagger(app)(options)
        }
        catch(err){

            console.error('Erro processar documentação swagger' , err)
        }
    }

module.exports = registreSwegger