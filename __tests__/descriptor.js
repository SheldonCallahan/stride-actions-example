const fs = require('fs')
const path = require('path')
const app = require('../app')
const request = require('supertest')(app)

let descriptor

/* Before All tests we want to read in the descriptor and parse it with JSON.
   We can then use that JSON variable in our tests.
 */
beforeAll(() => {
  descriptor = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../app-descriptor.json')).toString()
  )
})

test('Descriptor has all required properties set.', () => {
  expect(descriptor.baseUrl).toBeDefined()
  expect(descriptor.key).toBeDefined()
})

test('Required properties are valid', () => {
  request.get('/descriptor').then(res => {
    expect(res.body.baseUrl).toMatch(/^(https:\/\/)+/)
  })
  expect(descriptor.key).toMatch(/^[a-zA-Z0-9-._]+$/)
})

test('Lifecycle endpoints are defined', () => {
  //is the lifecycle propertiy defined
  expect(descriptor.lifecycle).toBeDefined()
  //are the installed and uninstalled endpoints defined
  expect(descriptor.lifecycle.installed).toBeDefined()
  expect(descriptor.lifecycle.uninstalled).toBeDefined()
})

test('Lifecycle endpoints are relative urls to the baseUrl', () => {
  //does the installed & uninstalled webhooks start with a / so that it's relative to the base URL
  expect(descriptor.lifecycle.installed).toMatch(/^\/+/)
  expect(descriptor.lifecycle.uninstalled).toMatch(/^\/+/)
})
