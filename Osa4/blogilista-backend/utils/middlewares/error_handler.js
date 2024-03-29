const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).send(error.message)
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid token" })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" })
  }

  next(error)
}

module.exports = errorHandler