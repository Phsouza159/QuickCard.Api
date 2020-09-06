
const BadRequestException = function( message , notification = []) {

    this.status = 400
    this.name = "Bad request exception erro"
    this.level = "Stop request"
    this.message = message
    this.notification = notification

    this.toString = function() { return `${this.name}: ${this.message}` }
}

module.exports = BadRequestException