
const BadRequestException = function( message ) {

    this.status = 400
    this.name = "Bad request exception erro"
    this.level = "Stop request"
    this.message = message

    this.toString = function() { return `${this.name}: ${this.message}` }
}

module.exports = BadRequestException