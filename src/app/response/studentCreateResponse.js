
/**
 * @typedef StudentCreateResponse
 * @property {Student.model} student - Student entity 
 * @property {string} token - Token acess 
 */
const StudentCreateResponse = function( student , token) {

    this.student = student
    this.token = token
}

module.exports = StudentCreateResponse