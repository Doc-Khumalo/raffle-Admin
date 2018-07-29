import React, { Component } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import fire from '../fire';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import './CompetitionTime.css';
import PopUp from '../PopUp/PopUp.component';

class CompetitionTime extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formStart: null,
      formEnd: null,
      resultStart: null,
      resultEnd: null,
      disabled: true,
      value: new Date(),
      siteLaunch: moment(),
      showPopup: false,
      time: 0,
      error: '',
      message: ''
    };

    this.handleLaunch = this.handleLaunch.bind(this);
  }

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
    this.togglePopup();
    document.getElementById("user-form").reset();
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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleLaunch(date) {
    this.setState({
      siteLaunch: date
    });

    const database = fire.database();
    const siteLaunch  = moment(date).tz("Europe/London").format();

    let timeNow = new Date();
    let newDate = new Date(date);

    if(newDate < timeNow) {
      this.setState({
        error: 'Please check your date'
      })
    } else {
      this.setState({
        error: ''
      });
      database.ref('setSiteLaunch/').set({
        siteLaunch
      });
    }
    console.log('siteLaunch', siteLaunch)
  }

  handleNumberOFWinners(event) {
    event.preventDefault();
    const database = fire.database();
    database.ref('setNumberOfWinners/').set({
      event
    });
  }

  render() {
    const popUpInfo = (
      <div>
        time set
      </div>
    )

    return (
      <div className="container-fluid">
        <div>
          {this.state.showPopup ?
            <PopUp
              info={popUpInfo}
              closePopup={() => this.togglePopup()}
            />
            : null
          }
        </div>

        <form action="" id="user-form" noValidate="novalidate">
          <fieldset>
            <div className="componentWrapper">
          <div className="formStart">
            <label className="labelInput">Form Start:</label>
            <div className="timeWrapper">
              <TimePicker
                format={24}
                initialValue="00:00"
                start="00:00"
                end="23:55"
                step={5}
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
                step={5}
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
                step={5}
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
                step={5}
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
          </fieldset>
        </form>

        <div>
          <h1>Site Launch</h1>
          <form>
            <fieldset>
              <div className="timeWrapper">
                <DatePicker
                  selected={this.state.siteLaunch}
                  onChange={this.handleLaunch}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                  timeCaption="time"
                  withPortal
                />
              </div>
              <div>{this.state.error}</div>
            </fieldset>
          </form>
        </div>
        <div>
          <h1>Number of winners</h1>
          <div>
            <div className="network-wrapper">
              <label>Network</label>
              <div className="form-group">
                <select
                  className="dropDown-custom"
                  id="dropDown-custom"
                  name='selectNetwork'
                  onChange={item => this.handleNumberOFWinners(item)}
                >
                  {options.map((item, i) => {
                    return (
                      <option
                        key={i}
                        className="dropdown-option"
                        value={item.label}
                      >
                        {item.value}
                      </option>
                    )
                  })}
                </select>
                <span className="errorEmail">{this.state.message}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompetitionTime;