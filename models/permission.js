const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    entity: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: true
    },
    create: {
        type: Boolean,
        required: true,
        default: true
    },
    update: {
        type: Boolean,
        required: true,
        default: true
    },
    delete: {
        type: Boolean,
        required: true,
        default: true
    },
})

module.exports = mongoose.model('Permission', permissionSchema)