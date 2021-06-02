const User = require('../models/user')

async function checkEmail(req, res, next){
    let alreadyExist
    try {
        await User.findOne({ email: req.body.email}, async (err, emailExists) => {
            if(err){
                return res.status(500).json(err)
            }else{
                alreadyExist = emailExists
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.emailAlreadyExist = alreadyExist
    next()
}

module.exports = checkEmail