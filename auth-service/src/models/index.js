const { makeExecutableSchema } = require('apollo-server')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './**/*.graphql')), { all: true })
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './**/*.resolvers.js')))

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
