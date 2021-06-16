const Role = require('../models/role')

async function fetchRoles(req, res, next){
    await Role.findOne({ADMIN: 'admin'}).exec((err, roles) => {
        if(err) return res.status(500).send(err)
        res.ROLES = roles
        next()
    })
}

module.exports = fetchRoles