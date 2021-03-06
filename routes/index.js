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
  debug = require('debug'),
  jwt = require('../lib/jwt.js'),
  sendToStride = require('../lib/send-message.js').factory({
    apiBaseUrl: API_BASE_URL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
  })

debug('router engaged')
router.use(bodyParser.json())

router.use(express.static('./public'))

//Serves all the request which includes /images in the url from Images folder
router.use('/img', express.static(__dirname + 'img'))
router.set('view engine', 'hbs')

//
// Installation Lifecyle webhook that runs after application is installed
// -----------------------------------------------------------------------------
router.post('/installed', jwt.validateJWT, function(req, res) {
  debug('router installed in a conversation')
  const cloudId = req.body.cloudId
  const conversationId = req.body.resourceId
  sendToStride.sendMessage(
    cloudId,
    conversationId,
    'Hi there! I am all about actions',
    function(err) {
      if (err) debug.log(err)
    }
  )
  res.sendStatus(204)
})

//
// Uninstall Lifecyle webhook that fires after application is uninstalled
// -----------------------------------------------------------------------------
router.post('/uninstalled', jwt.validateJWT, (req, res) => {
  debug('App uninstalled from a conversation.')
  res.sendStatus(204)
})

//
// Re-route to the descritor URL to Serve the descriptor file
// -----------------------------------------------------------------------------
router.get('/', function(req, res) {
  res.send('/descriptor')
})

router.get('/descriptor', (req, res) => {
  debug('router')
  let descriptor = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../app-descriptor.json')).toString()
  )
  descriptor.baseUrl = 'https://' + req.headers.host
  res.contentType = 'application/json'
  res.send(descriptor)
  res.end()
})

// //
// // Serve the html to the modal dialog window on stride
// // -----------------------------------------------------------------------------
router.get('/dialog', function(req, res) {
  res.render('modal', { title: 'Modal' })
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
