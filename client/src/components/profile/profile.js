import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { getUserById, getUsers } from '../UserFunctions';
import './profile.scss'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      role:'',
      showAllUsers: false,
      allUsers: []
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decode = jwt_decode(token);
    getUserById(decode.uid).then(res => {
      this.setState({
        username: res.data.username,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
        role:res.data.role,
        created_at: res.data.created_at

      });
    });

    getUsers().then(res => {
      this.setState({
        allUsers: res.data
      });
    });
  }

  render() {
    const items = this.state.allUsers.map((user, index) =>
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.created_at}</td>
      </tr>
    );
    return (
      <div className="container">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>User Name:</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Role:</td>
                <td>{this.state.role}</td>
              </tr>
              <tr>
                <td>Created At:</td>
                <td>{this.state.created_at}</td>
              </tr>
            </tbody>
          </table>

          {this.state.role === "admin" &&
            <div>
              <h1 className="text-center">All users</h1>
              <table className="table table-hover col-md-6 mx-auto">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {items}
                </tbody>
              </table>
            </div>}
        </div>
      </div>
    )
  }
}