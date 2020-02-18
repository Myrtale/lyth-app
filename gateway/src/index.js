const { SERVICE_PORT } = process.env

const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')

const { mergeSchemas } = require('graphql-tools')
const getRemoteSchema = require('./utils/getRemoteSchema')

const serviceList = [
  { name: 'auth-service', uri: 'http://auth-service:4001' },
]

;(async () => {
  const schemas = await Promise.all(serviceList.map(getRemoteSchema))
  const schema = mergeSchemas({ schemas, mergeDirectives: true })

  const server = new ApolloServer({ schema })

  const app = express()

  server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    bodyParserConfig: {
      limit: '10mb',
      type: 'application/json'
    }
  })

  const httpServer = http.createServer(app)
  httpServer.listen(SERVICE_PORT, () => {
    console.log(`http://localhost:${SERVICE_PORT}${server.graphqlPath}`)
  })
})()