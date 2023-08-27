import Blog from "./Blog"
import { useState, useEffect } from "react"
import blogService from "../services/blogs"
import NewBlog from "./NewBlog"

const BlogDisplay = ({ user, createMessage }) => {
  const [blogs, setBlogs] = useState([])
  const [createActive, setCreateActive] = useState(false)

  const onBlogCreation = async (event) => {
    event.preventDefault()

    const blog = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value
    }

    try {
      const result = await blogService.addBlog(blog, user.token)
      createMessage("Blog added successfully", "confirmation")
      result.data.user_id = user
      setBlogs(blogs.concat(result.data))
    } catch (Exception) {
      createMessage("Blog could not be added", "error")
    }
  }

  const likeHandler = async (blog) => {
    try {
      await blogService.likeBlog(blog)

      setBlogs(blogs.map(b => {
        if (b.id === blog.id) {
          return Object.assign({}, b, { likes: b.likes + 1 })
        }
        return b
      }))
    } catch (error) {
      createMessage(error.message, "error")
    }
  }

  const deleteHandler = async (blog) => {
    try {
      if (window.confirm(`Delete ${blog.title}?`)) {
        await blogService.deleteBlog(blog, user.token)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        createMessage("Blog deleted successfully", "confirmation")
      }
    } catch (error) {
      createMessage("Blog deletion failed", "error")
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(blogs)
    })
  }, [])

  return (
    <div className="Blogs">
      <h1>Blogs</h1>
      <NewBlog
        onBlogCreation={onBlogCreation}
        onCreateCancel={() => {setCreateActive(false)}}
        hidden={!createActive}
        onCreateActivation={setCreateActive}
      />
      { blogs.map(blog => <Blog key={blog.id} blog={blog} likeHandler={likeHandler} deleteHandler={deleteHandler} user={user} />) }
    </div>
  )
}

export default BlogDisplay