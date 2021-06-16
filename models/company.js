const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AutoIncrement2 = require('mongoose-sequence')(mongoose);

const companySchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    companyUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    companyNumber: { type: Number },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    contactNumber: { type: String, default: null },
    companyAddress: { type: String }
})

companySchema.plugin(AutoIncrement2, {inc_field: 'companyNumber'})
module.exports = mongoose.model('Company', companySchema)