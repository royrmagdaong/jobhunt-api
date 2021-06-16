const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const jobPostSchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    hiredApplicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: Schema.Types.ObjectId, ref: 'Job_Status' },
    numberOfApplicantNeeded: { type: Number, required: true },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    expectedSalary: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        required: true,
        default: moment(new Date()).format('L')
    },
    closed_at: {
        type: Date,
        default: null
    },
    updated_at: {
        type: Date,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Job_Post', jobPostSchema)