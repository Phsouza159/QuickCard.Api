const express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , swagger = require("swagger-node-express")
    , swaggerUi = require('swagger-ui-express')
    , expressSwagger = require('express-swagger-generator')
    , options = {
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Swagger',
                version: '2.0.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
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
        basedir: __dirname, //app absolute path
        //Path to the API handle folder
        files: [
            './app/controllers/**/*.js'
            ,'./app/models/**/*.js'
        ]
    };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/registroEstudante')(app);
require('./app/controllers/crudEstudante')(app);
require('./app/controllers/crudAnotacao')(app);
require('./app/controllers/crudBlocoAnotacao')(app);
require('./app/controllers/crudBlocoCartao')(app);
require('./app/controllers/crudCartao')(app);

app.listen(3000);
expressSwagger(app)(options)
//swagger.setAppHandler(app);