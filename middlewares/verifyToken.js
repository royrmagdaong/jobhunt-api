const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
    try {
        let tokenHeader = req.headers['authorization']
        let token = tokenHeader.split(" ")
        jwt.verify(token[1], process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(500).json({message: "Not authorized"})
            }else{
                res.user = decoded
                console.log(decoded)
                next()
            }
        });
    } catch (error) {
        return res.status(500).json({message: "Not authorized...."})
    }
}

module.exports = verifyToken