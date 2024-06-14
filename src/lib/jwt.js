const jsonwt = require('jsonwebtoken')
const { PRIVATE_KEY } = process.env

function sign(payload) {
   return jsonwt.sign(payload, PRIVATE_KEY, {expiresIn: '1d'})   
}

function verify(token) {
   return jsonwt.verify(token, PRIVATE_KEY)
}

module.exports = {
   sign, verify
}