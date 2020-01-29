import React, { Component } from 'react';
import './login.scss'
import { login } from '../UserFunctions';

let errors = {};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    errors["errormsg"] = "";
    this.setState({errors: errors});
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }
    if (this.validateForm(this.state)) {
      login(newUser).then(res => {
        if (res === undefined) {
          errors["errormsg"] = "Invalid email or password!";
          this.setState({errors: errors});
        } else {
          this.props.history.push('/profile');
        }
      });
    } else {
      console.log("incorect");
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
            <h1 className="h3 md font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="text"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.onChange} />
            </div>
            <span className='error'>{this.state.errors["errormsg"]}</span>
            <button type="submit" className="btn btn-lg btn-dark btn-block">
              Sign in
            </button>
            <div>
              <a href="/register" className="text-danger">
                Not a user register here
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}