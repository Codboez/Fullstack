import InputField from "./InputField"

const Login = ({ loginHandler }) => {
  return (
    <div className="Login">
      <form  onSubmit={ loginHandler }>
        <h2>Login</h2>
        <p>Username</p>
        <InputField placeholder="Enter username" type="text" id="username-input" />
        <p>Password</p>
        <InputField placeholder="Enter password" type="password" id="password-input" />
        <button type="submit" id="login-button">Login</button>
      </form>
    </div>
  )
}

export default Login