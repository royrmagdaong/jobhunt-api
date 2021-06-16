const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = Schema({
    ADMIN: {type: String, required: true, default: 'admin'},
    COMPANY_ADMIN: {type: String, required: true, default: 'company-admin'},
    COMPANY_USER: {type: String, required: true, default: 'company-user'},
    APPLICANT: {type: String, required: true, default: 'applicant'},
    GUEST: {type: String, required: true, default: 'guest'}
})

module.exports = mongoose.model('Role', roleSchema)