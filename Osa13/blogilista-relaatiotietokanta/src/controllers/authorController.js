import express from "express"
import { Blog } from "../models/index.js"
import { fn, col } from "sequelize"

const router = express.Router()

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [fn("COUNT", col("id")), "blogs"],
      [fn("SUM", col("likes")), "likes"]
    ],
    group: "author",
    order: [["likes", "DESC"]]
  })

  res.status(200).json(blogs)
})

export default router