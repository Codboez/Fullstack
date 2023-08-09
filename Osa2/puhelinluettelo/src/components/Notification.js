const Notification = ({type, text}) => {
    if (text === "" || text === null) {
        return null
    }

    let style = {
        background: "#BBB",
        borderStyle: "solid",
        width: "40%",
        padding: "10px",
        paddingLeft: "20px",
        fontSize: "18px"
    }

    switch (type) {
        case "error":
            style.color = "red"
            style.borderColor = "red"
            break
        case "confirmation":
            style.color = "green"
            style.borderColor = "green"
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