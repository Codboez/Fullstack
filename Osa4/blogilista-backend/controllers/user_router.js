const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1})

  response.json(users)
})

userRouter.get("/:id", async (request, response) => {
  const user = await User.findOne({ _id: request.params.id})

  response.json(user)
})

userRouter.post("/", async (request, response) => {
  const user = request.body
  const password = user.password

  if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return response.status(400).send({ error: "Password must contain a lowercase letter, uppercase letter and a number" })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  user.password = passwordHash

  const result = await new User(user).save()

  response.status(201).json(result)
})
/*
userRouter.delete("/:id", async (request, response) => {
  
})

userRouter.patch("/:id", async (request, response) => {
  
})*/

module.exports = userRouter