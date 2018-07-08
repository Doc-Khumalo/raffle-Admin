import React, { Component } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
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
    disabled: true,
    value: new Date(),
    time: 0
  };

  formStart = e => this.setState({ formStart: e });
  formEnd = e => this.setState({ formEnd: e });
  resultStart = e => this.setState({ resultStart: e });
  resultEnd = e => this.setState({ resultEnd: e });

  handleSubmit() {
    let newTimeToSend = [];
    let todayDate = moment().tz("Europe/London").toISOString().split('T')[0];
    const {
      formStart,
      formEnd,
      resultStart,
      resultEnd
    } = this.state;

    const formattedFormStart = moment.utc(formStart * 1000).format('HH:mm:ss');
    const formattedFormEnd = moment.utc(formEnd * 1000).format('HH:mm:ss');
    const formattedResultStart = moment.utc(resultStart * 1000).format('HH:mm:ss');
    const formattedResultEnd = moment.utc(resultEnd * 1000).format('HH:mm:ss');

    newTimeToSend.push(
      `${todayDate}T${formattedFormStart}`,
      `${todayDate}T${formattedFormEnd}`,
      `${todayDate}T${formattedResultStart}`,
      `${todayDate}T${formattedResultEnd}`
    );

    const postData = {
      formStart: moment(newTimeToSend[0]).tz("Europe/London").format(),
      formEnd: moment(newTimeToSend[1]).tz("Europe/London").format(),
      resultStart: moment(newTimeToSend[2]).tz("Europe/London").format(),
      resultEnd: moment(newTimeToSend[3]).tz("Europe/London").format(),
    };

    const database = fire.database();
    database.ref('setTimeForm/').set({
      postData
    });

    this.openPopupbox();
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
    return (
      <div className="container-fluid">
        <PopupboxContainer />
        <div className="componentWrapper">
          <div className="formStart">
            <label className="labelInput">Form Start:</label>
            <div className="timeWrapper">
              <TimePicker
                format={24}
                initialValue="00:00"
                start="00:00"
                end="23:55"
                step={15}
                value={this.state.formStart}
                onChange={e => this.formStart(e)}
              />
            </div>
          </div>
          <div className="formEnd">
            <label className="labelInput">Form End:</label>

            <div className="timeWrapper">
              <TimePicker
                format={24}
                start="00:00"
                end="23:55"
                step={15}
                value={this.state.formEnd}
                onChange={e => this.formEnd(e)}
              />
            </div>
          </div>
          <div className="resultStart">
            <label className="labelInput">Results Start:</label>
            <div className="timeWrapper">
              <TimePicker
                format={24}
                start="00:00"
                end="23:55"
                step={15}
                value={this.state.resultStart}
                onChange={e => this.resultStart(e)}
              />
            </div>
          </div>
          <div className="resultEnd">
            <label className="labelInput">Results End:</label>
            <div className="timeWrapper">
              <TimePicker
                format={24}
                start="00:00"
                end="23:55"
                step={15}
                value={this.state.resultEnd}
                onChange={e => this.resultEnd(e)}
              />
            </div>
          </div>
          {this.isTimeValid() === true &&
            <input
              type='button'
              value='submit times'
              onClick={() => this.handleSubmit()}
            />
          }
        </div>
      </div>
    )
  }
}

export default CompetitionTime;