import { useState, useEffect } from "react"
import BlogDisplay from "./components/BlogDisplay"
import Login from "./components/Login"
import Topbar from "./components/Topbar"
import Notification from "./components/Notification"
import loginService from "./services/login"

const App = () => {
  const [user, setUser] = useState({ username: "", name: "", token: "" })
  const [message, setMessage] = useState({ type: "", text: "" })

  const createMessage = (message, type) => {
    setMessage({ text: message, type: type })
    setTimeout(() => setMessage(""), 5000)
  }

  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const result = await loginService.login({ username: event.target[0].value, password: event.target[1].value })

      setUser(result)
      window.localStorage.setItem("blogAppUser", JSON.stringify(result))
    } catch (Exception) {
      createMessage("Could not login", "error")
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem("blogAppUser")
    setUser({ username: "", name: "", token: "" })
  }

  useEffect(() => {
    const userJson = window.localStorage.getItem("blogAppUser")

    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <Topbar isLoggedIn={ user.username !== "" } logoutHandler={ logoutHandler } />
      <Notification type={ message.type } text={ message.text } />
      { user.username && <BlogDisplay user={ user } createMessage={ createMessage } /> }
      { !user.username && <Login loginHandler={ loginHandler } /> }
    </div>
  )
}

export default App