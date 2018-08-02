import React, { Component } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import fire from '../fire';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
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
      formStartTime: moment(),
      formEndTime: moment(),
      resultStartTime: moment(),
      resultEndTime: moment(),
      showPopup: false,
      time: 0,
      error: '',
      message: '',
    };

    this.handleLaunch = this.handleLaunch.bind(this);
    this.formStart = this.formStart.bind(this);
    this.formEnd = this.formEnd.bind(this);
    this.resultStart = this.resultStart.bind(this);
    this.resultEnd = this.resultEnd.bind(this);
  }


  formStart(date) {
    this.setState({
      formStartTime: date
    });
  }

  formEnd(date) {
    this.setState({
      formEndTime: date
    });
  }

  resultStart(date) {
    this.setState({
      resultStartTime: date
    });
  }

  resultEnd(date) {
    this.setState({
      resultEndTime: date
    });
  }

  handleSubmit() {
    const {
      formStartTime,
      formEndTime,
      resultStartTime,
      resultEndTime,
    } = this.state;

    const postData = {
      formStart: moment(formStartTime).format(),
      formEnd: moment(formEndTime).format(),
      resultStart: moment(resultStartTime).format(),
      resultEnd: moment(resultEndTime).format(),
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
    const siteLaunch  = moment(date).format();

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
      winners: event.target.value,
    });

    this.setState({
      message: 'Number of winners set'
    })
  }

  render() {

    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const popUpInfo = (
      <div>
        time set
      </div>
    );

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
              <div className="form_time">
                <div className="formStart">
                  <label className="labelInput">Form Start:</label>
                  <div className="timeWrapper">
                    <DatePicker
                      selected={this.state.formStartTime}
                      onChange={this.formStart}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="LLL"
                      timeCaption="time"
                      withPortal
                    />
                  </div>
                </div>
                <div className="formEnd">
                  <label className="labelInput">Form End:</label>
                    <div className="timeWrapper">
                      <DatePicker
                        selected={this.state.formEndTime}
                        onChange={this.formEnd}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        withPortal
                      />
                    </div>
                </div>
              </div>
              <div className="result_time">
                <div className="resultStart">
                  <label className="labelInput">Results Start:</label>
                    <div className="timeWrapper">
                      <DatePicker
                          selected={this.state.resultStartTime}
                          onChange={this.resultStart}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="LLL"
                          timeCaption="time"
                          withPortal
                        />
                    </div>
                </div>
                <div className="formEnd">
                  <label className="labelInput">Results End:</label>
                    <div className="timeWrapper">
                      <DatePicker
                        selected={this.state.resultEndTime}
                        onChange={this.resultEnd}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        withPortal
                      />
                    </div>
                </div>
              </div>

                <input
                  type='button'
                  value='submit times'
                  className="btn btn-primary"
                  onClick={() => this.handleSubmit()}
                />
            </div>
          </fieldset>
        </form>

        <div className="site_launch">
          <h3>Site Launch</h3>
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
          <div className="number_of_winners">
          <h3>Number of winners</h3>
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
                      >
                        {item}
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
