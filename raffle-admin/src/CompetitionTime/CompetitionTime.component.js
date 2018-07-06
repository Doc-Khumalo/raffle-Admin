import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import fire from '../fire';
import moment from 'moment-timezone';
import './CompetitionTime.css';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';

class CompetitionTime extends Component{
  state = {
    formStart: null,
    formEnd: null,
    resultStart: null,
    resultEnd: null,
    disabled: true
  };

  formStart = formStart => this.setState({ formStart });
  formEnd = formEnd => this.setState({ formEnd });
  resultStart = resultStart => this.setState({ resultStart });
  resultEnd = resultEnd => this.setState({ resultEnd });

  handleSubmit() {
    const database = fire.database();
    console.log('all states', this.state)
    const postData = {
      formStart: moment(this.state.formStart).tz("Europe/London").format(),
      formEnd: moment(this.state.formEnd).tz("Europe/London").format(),
      resultStart: moment(this.state.resultStart).tz("Europe/London").format(),
      resultEnd: moment(this.state.resultEnd).tz("Europe/London").format(),
    };

    database.ref('setTimeForm/').set({
      postData
    });

    this.openPopupbox();
    // fire.database().ref('setTimeForm/').set({postData});
  }

  isTimeValid() {
    if(
      this.state.formStart !== null &&
      this.state.formEnd !== null &&
      this.state.resultStart !== null &&
      this.state.resultEnd !== null
    ) {
      return true
    }
    return false
  }
  openPopupbox() {
    const content = (
      <div>
        {/*<button onClick={() => this.updatePopupbox()}>Update!</button>*/}
      </div>
    );
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: `Time entry saved!`

        },
        fadeIn: true,
        fadeInSpeed: 500
      }
    })
  }
  render() {

    let test = document.getElementsByClassName('react-datetime-picker__button__input');
    console.log('test', test);

    return (
      <div className="container-fluid">
        <PopupboxContainer />
        <div className="formStart">
          <label className="labelInput">Form Start:</label>
          <DateTimePicker
            className="dateTimePicker"
            onChange={this.formStart}
            value={this.state.formStart}
          />
        </div>
        <div className="formEnd">
          <label className="labelInput">Form End:</label>
          <DateTimePicker
            className="dateTimePicker"
            onChange={this.formEnd}
            value={this.state.formEnd}
          />
        </div>
        <div className="resultStart">
          <label className="labelInput">Results Start:</label>
          <DateTimePicker
            className="dateTimePicker"
            onChange={this.resultStart}
            value={this.state.resultStart}
          />
        </div>
        <div className="resultEnd">
          <label className="labelInput">Results End:</label>
          <DateTimePicker
            className="dateTimePicker"
            onChange={this.resultEnd}
            value={this.state.resultEnd}
          />
        </div>

        {this.isTimeValid() === true &&
          <input
            type='button'
            value='submit times'
            onClick={() => this.handleSubmit()}
          />
        }
      </div>
    )
  }
}

export default CompetitionTime;