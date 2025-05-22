import express from "express"
import { Reading, User, Blog } from "../models/index.js"
import { tokenExtractor } from "../util/middleware.js"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.user_id)
    const blog = await Blog.findByPk(req.body.blog_id)

    if (!user || !blog) {
      return res.status(404).json({ error: "Invalid user or blog id" })
    }

    const reading = await Reading.create({ userId: req.body.user_id, blogId: req.body.blog_id })
    res.status(201).json(reading)
  } catch (error) {
    next(error)
  }
})

router.use(tokenExtractor)

router.put("/:id", async (req, res, next) => {
  const decodedToken = req.decodedToken

  try {
    const reading = await Reading.findOne({
      where: {
        id: req.params.id,
        userId: decodedToken.id
      }
    })

    if (!reading) {
      return res.status(401).json({ error: "Cannot modify blog that is not made by this user"})
    }

    if ("read" in req.body) {
      reading.read = req.body.read
      await reading.save()
    }
    
    res.status(200).json(reading)
  } catch (error) {
    next(error)
  }
})

export default router