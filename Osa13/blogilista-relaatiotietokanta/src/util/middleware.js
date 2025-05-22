import jwt from "jsonwebtoken"
import { SECRET_KEY } from "./config.js"
import { User, Session } from "../models/index.js"

export const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name == "SequelizeDatabaseError" || error.name == "SequelizeValidationError") {
    return res.status(400).send({ error: error.errors.map(e => e.message) })
  }

  next(error)
}

export const tokenExtractor = async (req, res, next) => {
  const auth = req.get("authorization")

  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing token" })
  }

  try {
    const token = auth.substring(7)
    const decodedToken = jwt.verify(token, SECRET_KEY)

    const user = await User.findByPk(decodedToken.id)

    if (user.disabled) {
      await Session.destroy({
        where: {
          userId: user.id
        }
      })
    }

    const session = await Session.findOne({
      where: {
        userId: user.id,
        token
      }
    })

    if (!session) {
      return res.status(401).json({ error: "Token expired" })
    }

    req.decodedToken = decodedToken
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" })
  }

  next()
}