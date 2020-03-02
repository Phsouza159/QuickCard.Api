
const UnauthorizedException = function( message ) {

    this.status = 401
    this.name = "unauthorized"
    this.level = "Stop request"
    this.message = message

    this.toString = function() { return `${this.name}: ${this.message}` }
}

module.exports = UnauthorizedException