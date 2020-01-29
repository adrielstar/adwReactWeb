import React, {Component} from 'react';
import './landing.scss'

export default class Landing extends Component {
  render() {
    return (
      <main>
        <section id="card">
            <ul>
                <li>
                    <span></span>
                    <strong>How can I help you, bro?</strong>
                </li>
                <li>
                    <span></span>
                    <strong>I dont know I can be helped.</strong>
                </li>
                <li>
                    <span></span>
                    <strong>That's deep. Let me help.</strong>
                </li>
            </ul>
        </section>
        <section id="primary">
            <h1>Your Personal Assistant</h1>
            <p>Get help with your daily life stuff.</p>

            <a href="/register" className="btn btn-lg btn-dark">Register Now</a>
        </section>
    </main>
    )
  }
}