'use strict'
const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({
  // required for Heroku
  port: process.env.PORT || 8080
})

server.route({
  method: 'GET',
  path: '/',
  handler: headers
})

server.start(() => console.log('Started'))

function headers(request, reply) {
  let headers = request.headers
  console.log(headers)
  reply({
    ipaddress: headers['x-forwarded-for'],
    language: headers['accept-language'].split(',')[0],
    software: headers['user-agent'].split(/[\(\)]/)[1]
  })
}
