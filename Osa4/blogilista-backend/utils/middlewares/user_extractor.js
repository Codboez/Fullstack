const jsonwebtoken = require("jsonwebtoken")
const User = require("../../models/User")

const userExtractor = async (request, response, next) => {
  const decodedToken = jsonwebtoken.verify(request.token, process.env.TOKEN_STRING)

  request.user = await User.findOne({ _id: decodedToken.id })

  next()
}

module.exports = userExtractor