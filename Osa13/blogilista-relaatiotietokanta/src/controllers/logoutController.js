import express from "express"
import { User, Session } from "../models/index.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../util/config.js"
import { tokenExtractor } from "../util/middleware.js"

const router = express.Router()

router.use(tokenExtractor)

router.delete("/", async (req, res, next) => {
  try {
    await Session.destroy({
      where: {
        userId: req.decodedToken.id
      }
    })

    res.status(200).end()
  } catch (error) {
    next(error)
  }
})

export default router