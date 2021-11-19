const jwt = require("jsonwebtoken")
const {SECRET} = process.env
require("dotenv").config()

const auth = async (req, res, next) => {
    try {
    // authorization: "bearer <token>"
    if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, SECRET)
        if(payload){
            req.payload = payload
            next()
        } else {
            res.status(400).json({error: "verification failed or no payload"})
        }
    } else {
        res.status(400).json({error: "no authorization header"})
    }} catch(error) {
        res.status(400).json({error})
    }
}

module.exports = auth