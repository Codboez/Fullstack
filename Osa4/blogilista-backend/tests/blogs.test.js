const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")
const Blog = require("../models/Blog")
const User = require("../models/User")

const initialBlogs = [
  {
    author: "abc",
    title: "aei",
    url: "abc.abc",
    likes: 23
  },
  {
    author: "aaa",
    title: "tgh",
    url: "tgh.aaa",
    likes: 8
  },
  {
    author: "aaa",
    title: "qwe",
    url: "qwe.aaa",
    likes: 16
  }
]

const initialUsers = [
  {
    username: "abc",
    name: "aei aei",
    password: "Foisefh98wev823r28"
  },
  {
    username: "aaaa",
    name: "aa aa",
    password: "45V23456b34345vdrfw34r"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (const user of initialUsers) {
    await api.post("/api/users").send(user)
  }

  const credentials = {
    username: "abc",
    password: "Foisefh98wev823r28"
  }

  const result = await api.post("/login").send(credentials)

  for (const blog of initialBlogs) {
    await api.post("/api/blogs").send(blog).set("Authorization", "Bearer " + result.body.token)
  }
})

describe("when logged in", () => {
  let token

  beforeEach(async () => {
    const credentials = {
      username: "abc",
      password: "Foisefh98wev823r28"
    }
  
    const result = await api.post("/login").send(credentials)
    token = result.body.token
  })

  describe("adding blogs", () => {
    test("Amount of blogs increases", async () => {
      const blog = {
        author: "aaa",
        title: "qwa",
        url: "qwa.aaa",
        likes: 16
      }
  
      const firstGetResponse = await api.get("/api/blogs")
      await api.post("/api/blogs").send(blog).set("Authorization", "Bearer " + token).expect(201)
      const secondGetResponse = await api.get("/api/blogs")
  
      expect(secondGetResponse.body.length - firstGetResponse.body.length).toBe(1)
    })
  
    test("Likes are set to 0 if not given", async () => {
      const blog = {
        author: "aaa",
        title: "qwa",
        url: "qwa.aaa"
      }
  
      await api.post("/api/blogs").send(blog).set("Authorization", "Bearer " + token).expect(201)
      const response = await api.get("/api/blogs")
  
      expect(response.body[3].likes).toBe(0)
    })
  
    test("Gives bad request when no author given", async () => {
      const blog = {
        title: "qwa",
        url: "qwa.aaa",
        likes: 0
      }
  
      await api.post("/api/blogs").send(blog).set("Authorization", "Bearer " + token).expect(400)
    })
  
    test("Gives bad request when no title given", async () => {
      const blog = {
        author: "aaa",
        url: "qwa.aaa",
        likes: 0
      }
  
      await api.post("/api/blogs").send(blog).set("Authorization", "Bearer " + token).expect(400)
    })
  
    test("Gives bad request when no url given", async () => {
      const blog = {
        title: "qwa",
        author: "aaa",
        likes: 0
      }
  
      await api.post("/api/blogs").send(blog).set("Authorization", "Bearer " + token).expect(400)
    })
  
  })
  
  describe("deleting blogs", () => {
    test("A blog has been deleted", async () => {
      const blogs = (await api.get("/api/blogs")).body
      await api.delete(`/api/blogs/${blogs[0].id}`).set("Authorization", "Bearer " + token).expect(204)
      const new_blogs = (await api.get("/api/blogs")).body
  
      expect(blogs.length - new_blogs.length).toBe(1)
    })
  
    test("Blog with correct id was deleted", async () => {
      const blogs = (await api.get("/api/blogs")).body
      await api.delete(`/api/blogs/${blogs[0].id}`).set("Authorization", "Bearer " + token).expect(204)
      const new_blogs = (await api.get("/api/blogs")).body
  
      expect(new_blogs.map(blog => blog.id).includes(blogs[0].id)).toBe(false)
    })
  })
})

describe("when not logged in", () => {
  describe("getting blogs", () => {
    test("Returns correct amount of blogs", async () => {
      const response = await api.get("/api/blogs")
  
      expect(response.body).toHaveLength(3)
    })
  
    test("Blogs id field is named correctly", async () => {
      const response = await api.get("/api/blogs")
  
      expect(response.body[0].id).toBeDefined()
    })
  })
  
  describe("updating blogs", () => {
    test("Blog amount did not change", async () => {
      const blog = {
        author: "aaa",
        title: "qwa",
        url: "qwa.aaa",
        likes: 16
      }
  
      const blogs = (await api.get("/api/blogs")).body
      await api.patch(`/api/blogs/${blogs[0].id}`).send(blog).expect(204)
      const new_blogs = (await api.get("/api/blogs")).body
  
      expect(new_blogs.length - blogs.length).toBe(0)
    })
  
    test("Blog was updated succesfully", async () => {
      const blog = {
        author: "aaa",
        title: "qwa",
        url: "qwa.aaa",
        likes: 16
      }
  
      const blogs = (await api.get("/api/blogs")).body
      await api.patch(`/api/blogs/${blogs[0].id}`).send(blog).expect(204)
      const new_blogs = (await api.get("/api/blogs")).body
  
      blog.id = blogs[0].id
      const new_blog = new_blogs.filter(b => b.id === blog.id)[0]
      delete new_blog.user_id
  
      expect(new_blog).toEqual(blog)
    })
  
    test("Blog updates correctly even when only given some fields", async () => {
      const blog = {
        author: "aaa",
        likes: 16
      }
  
      const blogs = (await api.get("/api/blogs")).body
      await api.patch(`/api/blogs/${blogs[0].id}`).send(blog).expect(204)
      const new_blogs = (await api.get("/api/blogs")).body
      
      blog.id = blogs[0].id
      blog.url = blogs[0].url
      blog.title = blogs[0].title
      const new_blog = new_blogs.filter(b => b.id === blog.id)[0]
      delete new_blog.user_id
  
      expect(new_blog).toEqual(blog)
    })
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})