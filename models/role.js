const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        unique: true,
        reqired: true
    },
    name: {
        type: String,
        unique: true,
        reqired: true
    },
    created_at: {
        type: Date,
        requried: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Role', roleSchema)