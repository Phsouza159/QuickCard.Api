const winston = require('winston')
    , fs = require('fs')
    ,  remoteLog = new winston.transports.Http({
            host: "localhost",
            port: 3000,
            path: "/errors"
    })


const consoleLog = new winston.transports.Console()

function createRequestLogger(transports) {
    const requestLogger = winston.createLogger({
        format: getRequestLogFormatter(),
        transports: transports
    })

    return function logRequest(req, res, next) {
        requestLogger.info({req, res})
        next()
    }
}

function createErrorLogger(transports) {
    const errLogger = winston.createLogger({
        level: 'error',
        transports: transports
    })

    return function logError(err, req, res, next) {
        errLogger.error({err, req, res})
        next()
    }
}

function getRequestLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            const {req, res} = info.message;
            return `${info.timestamp} ${info.level}: ${req.hostname}${req.port || ''}. Method: ${req.method} on ${req.originalUrl}`;
        })
    );
}

function writeLog(data) {

    let date = new Date()
        , fileName = `log-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.txt`
    
    fs.appendFile(`${__dirname}/../../log/${fileName}` , data , (suc , err) => {
    })
        
}

module.exports = {
    requestLogger: createRequestLogger([consoleLog]),
    errorLogger: createErrorLogger([remoteLog, consoleLog]) ,
    writeLog
}