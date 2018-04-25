require('dotenv').config()
const jwt = require('jsonwebtoken')
const debug = require('debug')('lifecycle:jwt')

/**
 * verifyRequest is Express Middleware that will validate the JWT token sent
 * from Stride.
 */
exports.verifyRequest = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.match(/Bearer (.*)/)[1]
    : req.query.jwt
  const scopedProcess = req.headers.mockprocess
    ? JSON.parse(req.headers.mockprocess)
    : process
  const decoded = jwt.verify(token, scopedProcess.env.CLIENT_SECRET)
  try {
    if (decoded.iss !== scopedProcess.env.CLIENT_ID) {
      throw new Error('JSON Web Token is not valid')
    }
    debug('JWT is valid')
    next()
  } catch (err) {
    debug('Unauthorized: ', err)
    res.send('401')
  }
}
