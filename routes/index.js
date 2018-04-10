/**
 * URL Routes for this application
 * --------------------------
 * Whenever Stride makes a call to your app (webhook, glance, sidebar, bot), it
 * send a to these urls.
 */

//
// Set up Enviorment Variables
// -----------------------------------------------------------------------------

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const API_BASE_URL = 'https://api.atlassian.com'

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
const express = require('express'),
  path = require('path'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  router = express(),
  logger = require('morgan'),
  jwt = require('../lib/jwt.js').factory({
    clientSecret: CLIENT_SECRET
  }),
  sendToStride = require('../lib/send-message.js').factory({
    apiBaseUrl: API_BASE_URL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
  })

logger('router engaged')
router.use(bodyParser.json())

router.use(express.static('./public'))

//Serves all the request which includes /images in the url from Images folder
router.use('/img', express.static(__dirname + 'img'))
router.set('view engine', 'hbs')

//
// Installation Lifecyle webhook that runs after application is installed
// -----------------------------------------------------------------------------
router.post('/installed', function(req, res) {
  logger('router installed in a conversation')
  const cloudId = req.body.cloudId
  const conversationId = req.body.resourceId
  sendToStride.sendMessage(
    cloudId,
    conversationId,
    'Hi there! I am all about actions',
    function(err) {
      if (err) logger.log(err)
    }
  )
  res.sendStatus(204)
})

//
// Uninstall Lifecyle webhook that fires after application is uninstalled
// -----------------------------------------------------------------------------
router.post('/uninstalled', (req, res) => {
  logger('App uninstalled from a conversation.')
  res.sendStatus(204)
})

//
// Re-route to the descritor URL to Serve the descriptor file
// -----------------------------------------------------------------------------
router.get('/', function(req, res) {
  res.redirect('/descriptor')
})

router.get('/descriptor', (req, res) => {
  logger('router')
  let descriptor = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../app-descriptor.json')).toString()
  )
  descriptor.baseUrl = 'https://' + req.headers.host
  res.contentType = 'application/json'
  res.send(descriptor)
  res.end()
})

//
// Serve the html to the modal dialog window on stride
// -----------------------------------------------------------------------------
router.get('/dialog', function(req, res) {
  res.render('modal', { title: 'Modal' })
})

//
// If the word "action" is mentioned in a message this url will be hit and send
// back a response
// -----------------------------------------------------------------------------
router.post('/action-message', jwt.validateJWT, function(
  { body: { cloudId, conversation } },
  res
) {
  let { actionMessage } = require('../messages/action-message.js')
  logger(actionMessage)

  sendToStride.sendMessage(cloudId, conversation.id, actionMessage, function() {
    logger('Message Sent: ', actionMessage)
    //Stop Webhook from sending 3 times by returning 200;
    res.send('200')
  })
})

// If the bot is mention it will send an applicaiton card back with open dialog
// action button
// -----------------------------------------------------------------------------
router.post('/bot-mention', jwt.validateJWT, function(
  { body: { cloudId, conversation } },
  res
) {
  let { actionCard } = require('../messages/action-card.js')

  sendToStride.sendMessage(cloudId, conversation.id, actionCard, function() {
    logger('Message Sent: ', actionCard)
    //Stop Webhook from sending 3 times by returning 200;
    res.send('200')
  })
})

router.get('/sidebar', (req, res) => {
  res.render('sidebar', { title: 'Sidebar' })
})
router.get('/glance/state', (req, res) => {
  res.send({
    label: {
      value: 'Sidebar Action'
    }
  })
})

module.exports = router
