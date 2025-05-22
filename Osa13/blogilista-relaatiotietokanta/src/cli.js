import Blog from "./models/blogs.js"

Blog.findAll().then(blogs => {
  blogs.forEach(blog => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
})