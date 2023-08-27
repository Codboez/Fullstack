const Notification = ({ type, text }) => {
  if (text === "" || text === null) {
    return null
  }

  let style = {
    width: "100%",
    padding: "10px",
    paddingLeft: "20px",
    fontSize: "18px",
    position: "fixed",
    top: "0",
    marginTop: "47px",
    zIndex: "998"
  }

  switch (type) {
  case "error":
    style.color = "white"
    style.background = "red"
    break
  case "confirmation":
    style.color = "white"
    style.background = "green"
    break
  default:
    return null
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification