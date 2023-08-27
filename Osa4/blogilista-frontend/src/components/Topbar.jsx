const Topbar = ({ isLoggedIn, loginHandler, logoutHandler }) => {
  return (
    <div className="topBar">
      <h2>BlogApp</h2>
      { isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      { !isLoggedIn && <button onClick={() => {}}>Login</button>}
    </div>
  )
}

export default Topbar