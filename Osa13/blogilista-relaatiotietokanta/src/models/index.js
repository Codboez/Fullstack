import Blog from "./blogs.js"
import User from "./users.js"
import Reading from "./readings.js"
import Session from "./session.js"

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading, as: "readings" })
Blog.belongsToMany(User, { through: Reading, as: "usersReading" })

User.hasMany(Session)
Session.belongsTo(User)

export { Blog, User, Reading, Session }