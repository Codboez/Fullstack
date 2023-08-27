import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: "Bearer " + token } })
  return response
}

const likeBlog = async (blog) => {
  const response = await axios.patch(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 })
  return response
}

const deleteBlog = async (blog, token) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, { headers: { Authorization: "Bearer " + token } })
  return response
}

export default { getAll, addBlog, likeBlog, deleteBlog }