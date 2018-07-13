import React, {Component} from 'react';
import CompetitionTime from '../CompetitionTime/CompetitionTime.component';
import './Login.css';
import fire from '../fire';

import PopUp from '../PopUp/PopUp.component';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null,
      loggedIn: false,
      userDiv: '',
      loginDiv: '',
      showPopup: false,
      errorMessage: null,
      disabled: true
    }
  }

  labelHandler = event => {
    console.log('labelHandler', event)
  };

  handleSubmit = event => {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);

    const { email, password } = this.state;
    if(email !== null && password !== null) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleSignIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
    fire.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          loggedIn: true
        });
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          errorMessage: error.message,
          loggedIn: false
        });
        this.togglePopup();
    });
  };

  handleLogout(event) {
    event.preventDefault();
    fire.auth().signOut();
    this.setState({
      loggedIn: false
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    const popUpInfo = (
      <div>
        {this.state.errorMessage}
      </div>
    );

    return (
      <div>
        <div>
          {this.state.showPopup ?
            <PopUp
              info={popUpInfo}
              closePopup={() => this.togglePopup()}
            />
            : null
          }
        </div>
        Login
        {this.state.loggedIn === false &&
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
        }
        {this.state.loggedIn === true &&
          <div>
            <CompetitionTime />
            <button
              className="btn btn-primary custom-button"
              type="submit"
              onClick={event => this.handleLogout(event)}
            >
              Logout
            </button>
          </div>
        }
      </div>
    )
  }
}

export default Login;