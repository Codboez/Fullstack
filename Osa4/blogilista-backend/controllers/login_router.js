const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jsonwebtoken = require("jsonwebtoken")

loginRouter.post("/", async (request, response) => {
  const user = await User.findOne({ username: request.body.username })

  if (!(user && await bcrypt.compare(request.body.password, user.password))) {
    return response.status(401).json({ error: "Invalid username or password" })
  }

  const tokenUser = { username: user.username, id: user._id }
  const token = jsonwebtoken.sign(tokenUser, process.env.TOKEN_STRING, { expiresIn: 60*60 })

  response.status(200).json({ token: token, username: user.username, name: user.name, id: user.id })
})

module.exports = loginRouter