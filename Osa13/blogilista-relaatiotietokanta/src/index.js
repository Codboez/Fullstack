import express from "express"
import { connectToDatabase } from "./util/db.js"
import { PORT } from "./util/config.js"
import { errorHandler } from "./util/middleware.js"
import blogController from "./controllers/blogController.js"
import loginController from "./controllers/loginController.js"
import userController from "./controllers/userController.js"
import authorController from "./controllers/authorController.js"
import readingController from "./controllers/readingController.js"
import logoutController from "./controllers/logoutController.js"

const app = express()
app.use(express.json())

app.use("/api/blogs", blogController)
app.use("/api/login", loginController)
app.use("/api/users", userController)
app.use("/api/authors", authorController)
app.use("/api/readinglists", readingController)
app.use("/api/logout", logoutController)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()