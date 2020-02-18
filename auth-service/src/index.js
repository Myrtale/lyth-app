const { ApolloServer } = require('apollo-server')

const schema = require('./models')
const context = require('./context')

const { SERVICE_PORT } = require('./configs/env')

const server = new ApolloServer({
  schema,
  context,
  // mocks: true,
  onHealthCheck: () => {
    return new Promise((resolve, reject) => {
      if (true) resolve()

      reject()
    })
  },
})

server
  .listen(SERVICE_PORT)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
    console.log(`🚀  Health check at ${url}.well-known/apollo/server-health`)
  })