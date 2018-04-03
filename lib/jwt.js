const jwtUtil = require('jwt-simple')

/**
 * Securing your app with JWT
 * --------------------------
 * Whenever Stride makes a call to your app (webhook, glance, sidebar, bot), it passes a JSON Web Token (JWT).
 * This token contains information about the context of the call (cloudId, conversationId, userId)
 * This token is signed, and you should validate the signature, which guarantees that the call really comes from Stride.
 * You validate the signature using the app's client secret.
 *
 * In this tutorial, the token validation is implemented as an Express middleware function which is executed
 * in the call chain for every request the app receives from Stride.
 * The function extracts the context of the call from the token and adds it to a local variable.
 */

function factory({ clientSecret, debugId = 'jwt.js', logger = console }) {
  function getJWT(req) {
    // Extract the JWT token from the request
    // Either from the "jwt" request parameter
    // Or from the "authorization" header, as "Bearer xxx"
    var encodedJwt =
      req.query['jwt'] ||
      req.headers['authorization'].substring(7) ||
      req.headers['Authorization'].substring(7)

    //TEMP FIX FOR BUG
    if (
      req.headers['authorization'] &&
      !req.headers['authorization'].startsWith('Bearer')
    )
      encodedJwt = req.headers['authorization']

    if (!encodedJwt)
      throw new Error('Stride/getJWT: expected encoded JWT not found!')

    // Decode the base64-encoded token, which contains the context of the call
    const decodedJwt = jwtUtil.decode(encodedJwt, null, true)

    const jwt = { encoded: encodedJwt, decoded: decodedJwt }

    logger.log(`- ${debugId}/getJWT() got JWT` /*, prettify_json(jwt)*/)

    return jwt
  }

  function validateJWT(req, res, next) {
    let logDetails = {
      debugId,
      endpoint: req.path,
      method: req.method
    }

    try {
      const jwt = getJWT(req)

      logger.log(`- ${debugId}/validating JWT...`)

      // Validate the token signature using the app's OAuth secret (created in DAC App Management)
      // (to ensure the call comes from Stride)
      jwtUtil.decode(jwt.encoded, clientSecret)

      // all good, it's from Stride
      logger.info(
        `- ${debugId}: JWT valid` /*, prettify_json({...logDetails})*/
      )

      // if any, add the context to a local variable
      const conversationId = jwt.decoded.context.resourceId,
        cloudId = jwt.decoded.context.cloudId,
        userId = jwt.decoded.sub

      logDetails = {
        logDetails,
        cloudId,
        conversationId,
        userId
      }
      res.locals.context = { cloudId, conversationId, userId }

      // Continue with the rest of the call chain
      next()
    } catch (err) {
      logger.warn(
        `! ${debugId}: Invalid JWT:` + err.message,
        prettify_json({ logDetails, err })
      )
      // a rogue call not frow a legitimate Stride client?
      res.sendStatus(403)
    }
  }

  return {
    validateJWT,
    getJWT
  }
}

module.exports = {
  factory
}
