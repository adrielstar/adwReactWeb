import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import {getUser} from '../UserFunctions';
import './profile.scss'

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: ''
    }
  }

  componentDidMount(){
    const token = localStorage.usertoken;
    const decode = jwt_decode(token);
    getUser(decode.uid).then(res => {
      this.setState({
        username: res.data.username,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>User Name</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}