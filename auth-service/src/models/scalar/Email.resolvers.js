const { GraphQLScalarType, GraphQLError } = require('graphql')

module.exports = {
  Email: new GraphQLScalarType({
    name: 'Email',
    description: 'Email scalar type',
    parseValue(value) {
      return validate(value)
    },
    serialize(value) {
      return validate(value)
    },
    parseLiteral(ast) {
      if (ast.kind !== Kind.String) {
        throw new GraphQLError('Email should be a string')
      }

      return validate(value)
    },
  })
}

const validate = value => {
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
    throw new GraphQLError('Invalid email address')
  }

  return value
}
