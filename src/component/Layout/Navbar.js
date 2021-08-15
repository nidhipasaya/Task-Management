import React from 'react'
import { NavLink, Link } from 'react-router-dom'


const Navbar = (props) => {

  const logout = () => {
    props.setLogoutUser(false);
    let list = [];
    localStorage.setItem('login', JSON.stringify(list))
  }
  const userDetails = JSON.parse(localStorage.getItem('login'));
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {props.logoutUser && userDetails && userDetails[0].username ?
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/viewTasks">Tasks</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/jokes">Jokes</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/" onClick={logout}>Logout</NavLink>
                </li></>
              : <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Login</NavLink>
              </li>
            }
          </ul>
        </div>
        {props.logoutUser && userDetails && userDetails[0].username ?
          <Link className="btn btn-outline-primary" to="/editTask">Create Task</Link>
          : null}
      </div>
    </nav>
  )
}
export default Navbar;