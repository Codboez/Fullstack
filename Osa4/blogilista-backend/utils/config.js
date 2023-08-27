require("dotenv").config()

const MONGO_URL = process.env.NODE_ENV === "test" ? process.env.MONGODB: process.env.TEST_MONGODB
const PORT = 3003

module.exports = {MONGO_URL, PORT}