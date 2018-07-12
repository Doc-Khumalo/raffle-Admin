import React, {Component} from 'react';
import CompetitionTime from '../CompetitionTime/CompetitionTime.component';
import './Login.css';
import fire from '../fire';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null,
      loggedIn: false,
      userDiv: '',
      loginDiv: ''
    }
  }

  labelHandler = event => {
    console.log('labelHandler', event)
  };

  handleSubmit = event => {

    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);

    console.log('handleSubmit', this.state)
  };

  handleSignIn(event) {
    event.preventDefault();
    this.handleFire();
    // this.setState({ loggedIn: true });

    const { email, password } = this.state;

    fire.auth().signInWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...

      console.log('handleSignIn', email, password, errorCode, errorMessage);
    });
  };

  handleFire(event) {
    // event.preventDefault();
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in.', user)

        let user = fire.auth().currentUser;

        if (user !== null) {
          this.setState({ loggedIn: true })
        }
      } else {
        this.setState({ loggedIn: false })
        console.log('No user is signed in.', user)
      }
    });
    console.log('handleFire', event)
  };

  render() {
    const {
      userName,
      passWord,
      loggedIn,
      userDiv,
      loginDiv,
    } = this.state;

    return (
      <div>
        Login
        {this.state.loggedIn === false ? (
          <form action="" id="user-form" noValidate="novalidate" onSubmit={event => this.handleSignIn(event)}>
          <fieldset>
            <div>
              <label>Email</label>
              <input
                className="form-control formInput"
                placeholder="Please enter Email"
                name='email'
                type="email"
                id="email_field"
                onChange={event => this.handleSubmit(event)}
                onClick={event => this.labelHandler(event)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="form-control formInput"
                placeholder="Please enter Email"
                name='password'
                type="password"
                id="password_field"
                onChange={event => this.handleSubmit(event)}
                onClick={event => this.labelHandler(event)}
              />
            </div>
            <button
              disabled={this.state.disabled}
              className="btn btn-primary custom-button"
              type="submit">
              Login to Account
            </button>
          </fieldset>
        </form>
          ) : (
            <div>
              <CompetitionTime />
            </div>
        )}
      </div>
    )
  }
}

export default Login;