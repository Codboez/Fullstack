import express from "express"
import { Blog, User } from "../models/index.js"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create({ username: req.body.username, name: req.body.name })
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] }
      }
    })
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })

    user.name = req.body.name
    await user.save()

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res) => {
  let readingsWhere = {}

  if (req.query.read) {
    readingsWhere = {
      read: req.query.read
    }
  }

  const user = await User.findOne({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Blog,
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      as: "readings",
      through: {
        attributes: ["id", "read"],
        where: readingsWhere
      }
    }
  })

  res.status(200).json(user)
})

export default router