const request = require("request");

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
function factory({ apiBaseUrl, clientId, clientSecret, logger = console }) {

//
// Get access token from Stride API
// -----------------------------------------------------------------------------  
  function getAccessToken(callback) {
    const options = {
      uri: apiBaseUrl + "/oauth/token",
      method: "POST",
      json: {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        audience: "api.atlassian.com"
      }
    };
    request(options, function(err, response, body) {
      if (response.statusCode === 200 && body.access_token) {
        callback(null, body.access_token);
      } else {
        callback(
          "could not generate access token: " + JSON.stringify(response)
        );
      }
    });
  }

//
// Send Message Function
// -----------------------------------------------------------------------------
  function sendMessage(cloudId, conversationId, messageTxt, callback) {
    let options = {};

    getAccessToken(function(err, accessToken) {
      if (err) {
        callback(err);
      } else {
        const uri =`${apiBaseUrl}/site/${cloudId}/conversation/${conversationId}/message`;
        options = {
          uri: uri,
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken,
            "cache-control": "no-cache"
          },
          json: {
            body: messageTxt
          }
        };

        request(options, function(err, response, body) {
          logger.log(body);
          callback(err, body);
        });
      }
    });

    return logger.log(options);
  }

  return {
    sendMessage
  };
}

module.exports = {
  factory
};
