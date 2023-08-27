import { useState } from "react"
import { PropTypes } from "prop-types"

const Blog = ({ blog, likeHandler, user, deleteHandler }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const buttonName = infoVisible ? "Hide" : "View"

  return (
    <div className="Blog">
      <p id="Blog-title">{blog.title}</p>
      <button onClick={() => setInfoVisible(!infoVisible)}>{buttonName}</button>
      {infoVisible && <p>Author: {blog.author}</p>}
      {infoVisible && <p>URL: <a href={blog.url}>{blog.url}</a></p>}
      {infoVisible && <p>Likes: {blog.likes}<button onClick={() => likeHandler(blog)}>Like</button></p>}
      {infoVisible && <p>Posted by: {blog.user_id.username}</p>}
      {infoVisible && user.id === blog.user_id.id && <button id="Delete-button" onClick={() => deleteHandler(blog)}>Delete</button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default Blog