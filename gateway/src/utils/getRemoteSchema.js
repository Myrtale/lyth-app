const { HttpLink } = require('apollo-link-http')
const { introspectSchema, makeRemoteExecutableSchema } = require('graphql-tools')
const fetch = require('node-fetch')

module.exports = async ({ name, uri }) => {
  const link = new HttpLink({ uri, fetch })

  const schema = await introspectSchema(link)
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  })

  return executableSchema
}