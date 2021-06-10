const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AutoIncrement = require('mongoose-sequence')(mongoose);

const applicantSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    applicantNumber: { type: Number },
    contactNum: { type: String, default: null },
    birthDate: { type: Date, default: null },
    height: { type: String, default: null },
    weight: { type: String, default: null },
    nationality: { type: String, default: null },
    civilStatus: { type: String, default: null },
    religion: { type: String, default: null },
    skills: [],
    experience: [],
    education:[]
})

applicantSchema.plugin(AutoIncrement, {inc_field: 'applicantNumber'})
module.exports = mongoose.model('Applicant', applicantSchema)