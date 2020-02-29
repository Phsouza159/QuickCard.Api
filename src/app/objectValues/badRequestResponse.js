/**
 * @typedef BadRequestResponse
 * @property {String} status - status code 
 * @property {String} message - message erro 
 * @property {Array<String>} notifications - list notifications  
 */
const BadRequestResponse = function( message , notifications ) {

    this.status = 400
    this.message = message 
    this.notifications = notifications
}


module.exports = BadRequestResponse