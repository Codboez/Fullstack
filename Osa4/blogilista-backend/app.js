const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blog_router")
const userRouter = require("./controllers/user_router")
const loginRouter = require("./controllers/login_router")
const config = require("./utils/config")
const errorHandler = require("./utils/middlewares/error_handler")
const tokenExtractor = require("./utils/middlewares/token_extractor")

mongoose.connect(config.MONGO_URL)

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing_router")
  app.use("/api/testing", testingRouter)
}

app.use(errorHandler)

module.exports = app