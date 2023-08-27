const blogRouter = require("express").Router()
const Blog = require("../models/Blog")
const jsonwebtoken = require("jsonwebtoken")
const userExtractor = require("../utils/middlewares/user_extractor")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user_id", { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findOne({ _id: request.params.id }).populate("user_id", {username: 1, name: 1 })

  response.json(blog)
})

blogRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user

  if (request.body.likes) {
    return response.status(400).end()
  }

  let blog = new Blog(request.body)
  blog.user_id = user._id
  blog = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(blog)
})

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findOne({ _id: request.params.id })

  if (blog.user_id.toString() !== request.user.id) {
    throw new jsonwebtoken.JsonWebTokenError()
  }

  await Blog.deleteOne({ _id: blog.id })

  response.status(204).end()
})

//Currently very insecure. Anything can be patched.
blogRouter.patch("/:id", async (request, response) => {
  await Blog.updateOne({_id: request.params.id}, request.body, { new: true, runValidators: true, context: "query" })

  response.status(204).end()
})

module.exports = blogRouter