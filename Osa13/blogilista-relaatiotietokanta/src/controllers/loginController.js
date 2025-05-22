import express from "express"
import { User, Session } from "../models/index.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../util/config.js"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } })
    console.log(user)

    if (!user || req.body.password !== "secret") {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    if (user.disabled) {
      return res.status(403).json({ error: "This account is disabled"})
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userForToken, SECRET_KEY)
    await Session.create({ userId: user.id, token })

    res.status(200).json({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

export default router