const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")
const User = require("../models/User")

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
  await User.deleteMany({})

  for (const user of initialUsers) {
    await api.post("/api/users").send(user)
  }
})

describe("logging in", () => {
  test("Token is created when credentials are correct", async () => {
    const credentials = {
      username: "abc",
      password: "Foisefh98wev823r28"
    }

    const response = await api.post("/login").send(credentials).expect(200)

    expect(response.body.token).toBeDefined()
  })

  test("Returns unauthorized when username does not exist", async () => {
    const credentials = {
      username: "abcd",
      password: "Foisefh98wev823r28"
    }

    await api.post("/login").send(credentials).expect(401)
  })

  test("Returns unauthorized when password incorrect", async () => {
    const credentials = {
      username: "abcd",
      password: "Fois823r28"
    }

    await api.post("/login").send(credentials).expect(401)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})