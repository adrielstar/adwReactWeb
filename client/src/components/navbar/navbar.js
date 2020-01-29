import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss'

export default class Navbar extends Component {
  logout(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            My AWD
          </Link>
        </li>
      </ul>
    )
    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            My AWD
        </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to="/profile" className="dropdown-item">Profile</Link>
            <a href="/#" onClick={this.logout.bind(this)} className="dropdown-item">logout</a>
          </div>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg rounded navbar-light">
        <button className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="toggle Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navbar1"
          className="collapse navbar-collapse justify-content-md-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}