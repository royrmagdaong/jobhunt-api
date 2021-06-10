const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobPostSchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
    applied_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
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

module.exports = mongoose.model('JobPost', jobPostSchema)