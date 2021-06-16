const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = Schema({
    statusId: { type: Number, required: true },
    name: { type: String, required: true },
})

module.exports = mongoose.model('Status', statusSchema)
