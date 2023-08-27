const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")
const User = require("../models/User")

const initialUsers = [
  {
    username: "abc",
    name: "aei aei",
    password: "foisefh98wev823r28"
  },
  {
    username: "aaaa",
    name: "aa aa",
    password: "45v23456b34345vdrfw34r"
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  for (const blog of initialUsers) {
    await new User(blog).save()
  }
})

describe("getting users", () => {
  test("Returns correct amount of users", async () => {
    const users = (await api.get("/api/users")).body

    expect(users.length).toBe(2)
  })

  test("Users id field is named correctly", async () => {
    const response = await api.get("/api/users")

    expect(response.body[0].id).toBeDefined()
  })

  test("Users password is not returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0].password).toBeUndefined()
  })
})

describe("adding users", () => {
  test("Amount of users increase", async () => {
    const user = {
      username: "bbb",
      name: "bbb bbb",
      password: "6bBb6"
    }

    const users = (await api.get("/api/users")).body
    await api.post("/api/users").send(user).expect(201)
    const new_users = (await api.get("/api/users")).body

    expect(new_users.length - users.length).toBe(1)
  })

  test("User is added correctly", async () => {
    const user = {
      username: "bbb",
      name: "bbb bbb",
      password: "6bBb6"
    }

    await api.post("/api/users").send(user).expect(201)
    const users = (await api.get("/api/users")).body

    const new_user = users.filter(u => u.username === user.username)[0]

    user.id = new_user.id
    delete user.password
    user.blogs = []

    expect(new_user).toEqual(user)
  })

  test("Returns bad request when password does not contain uppercase letters", async () => {
    const user = {
      username: "bbb",
      name: "bbb bbb",
      password: "6bbb6"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when password does not contain lowercase letters", async () => {
    const user = {
      username: "bbb",
      name: "bbb bbb",
      password: "6BBB6"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when password does not contain numbers", async () => {
    const user = {
      username: "bbb",
      name: "bbb bbb",
      password: "bBb"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when password is missing", async () => {
    const user = {
      username: "bbb",
      name: "bbb bbb"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when username is too short", async () => {
    const user = {
      username: "bb",
      name: "bbb bbb",
      password: "6bBb6"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when username is missing", async () => {
    const user = {
      name: "bbb bbb",
      password: "6bBb6"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when name is missing", async () => {
    const user = {
      username: "bbb",
      password: "6bBb6"
    }

    await api.post("/api/users").send(user).expect(400)
  })

  test("Returns bad request when username is not unique", async () => {
    const user = {
      username: "abc",
      name: "bbb bbb",
      password: "6bBb6"
    }

    await api.post("/api/users").send(user).expect(400)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})