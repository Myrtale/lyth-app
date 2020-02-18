require('dotenv').config('../.env')

const {
  SERVICE_PORT,
  NODE_ENV
} = process.env

module.exports = {
  SERVICE_PORT,
  NODE_ENV
}
