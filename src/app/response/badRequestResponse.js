/**
 * @typedef BadRequestResponse
 * @property {string} status - status code 
 * @property {string} message - message erro 
 * @property {Array<string>} notifications - list notifications  
 */
const BadRequestResponse = function( message , notifications ) {

    this.status = 400
    this.message = message 
    this.notifications = notifications
}


module.exports = BadRequestResponse