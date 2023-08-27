const InputField = ({ placeholder, type, id }) => {
  return (
    <div>
      <input placeholder={placeholder} type={type} id={id}></input>
    </div>
  )
}

export default InputField