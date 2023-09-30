import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  style.display = notification ? "block": "none"

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
