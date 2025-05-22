import express from "express"
import { Blog, User } from "../models/index.js"
import { tokenExtractor } from "../util/middleware.js"
import { Op } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { author: {
          [Op.substring]: req.query.search
        }},
        { title: {
          [Op.substring]: req.query.search
        }}
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["id", "name", "username"]
    },
    where,
    order: [["likes", "DESC"]]
  })
  res.status(200).json(blogs)
})

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      return res.status(404).end()
    }

    if (req.body.likes) {
      blog.likes = req.body.likes
      await blog.save()
    }

    res.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

router.use("/", tokenExtractor)

router.post("/", async (req, res, next) => {
  const blog = req.body
  const decodedToken = req.decodedToken

  try {
    const newBlog = await Blog.create({ ...blog, userId: decodedToken.id })
    res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  const decodedToken = req.decodedToken

  try {
    await Blog.destroy({ where: { id: req.params.id, userId: decodedToken.id } })
    res.status(200).end()
  } catch (error) {
    next(error)
  }
})

export default router