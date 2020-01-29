import React, { Component } from 'react';
import { register } from '../UserFunctions';
import './register.scss'

const validEmailRegex =
  RegExp(/^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'username':
        errors.username =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'first_name':
        errors.first_name =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'last_name':
        errors.last_name =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    }

    if (this.validateForm(this.state)) {
      console.info('Valid Form');
      register(newUser).then(res => {
        this.props.history.push('/login');
      });
    } else {
      console.error('Invalid Form')
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors.errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );

    Object.values(errors).forEach(
      (val) => val === '' && (valid = false)
    );

    return valid;
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <h1 className="h3 md font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input type="text"
                className="form-control"
                name="username"
                placeholder="Enter your user name"
                value={this.state.username}
                onChange={this.onChange} noValidate />
              {this.state.errors.username.length > 0 &&
                <span className='error'>{this.state.errors.username}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter your first name"
                value={this.state.first_name}
                onChange={this.onChange} />
              {this.state.errors.first_name.length > 0 &&
                <span className='error'>{this.state.errors.first_name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter your last name"
                value={this.state.last_name}
                onChange={this.onChange} />
              {this.state.errors.last_name.length > 0 &&
                <span className='error'>{this.state.errors.last_name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="text"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.onChange} />
              {this.state.errors.email.length > 0 &&
                <span className='error'>{this.state.errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.onChange} />
              {this.state.errors.password.length > 0 &&
                <span className='error'>{this.state.errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Register
            </button>
          </form>
        </div>
      </div>
    )
  }
}