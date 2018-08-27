import React, { Component } from 'react';
import fire from '../fire';
import List from './List.component';
import Winners from './Winners.component';
import './List.css';


const database = fire.database();
let receivedDataUsers, receivedDataWinners;
let dataToSearch = [];
let dataWinners = [];
let receivedDataTime = [];

database.ref('users/').once('value').then((snapshot) => {
  receivedDataUsers = Object.entries(snapshot.val());
  if(receivedDataUsers !== null) {
    receivedDataUsers.map(item => {
      dataToSearch.push(item[1].user)
    });
  }
});

database.ref('dailyWinningNumbers/').once('value').then((snapshot) => {
  receivedDataWinners = Object.entries(snapshot.val());
  if(receivedDataWinners !== null) {
    receivedDataWinners[0][1].map(item => {
      dataWinners.push(item)
    });
  }
});

class ManageDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfEntriesToday: null,
      numberOfEntriesYesterday: null,
      winningNumbersToday: null,
      winningConfirmedList: null,
      numberOfWinnersSet: null,
      users: dataToSearch,
      winners: dataWinners,
      confirmedListReceived: [],
      items: [],
      itemWinners: [],
      showUsers: false,
      showWinners: false
    };
  }

  componentWillMount() {
    let collectedData = [];
    let winnerList= [];
    const database = fire.database();
    database.ref('users/').once('value').then((snapshot) => {
      let receivedData = Object.entries(snapshot.val());
      receivedData.map(item => {
        collectedData.push(item[1].user)
      });
      this.setState({
        numberOfEntriesToday: collectedData.length
      });
    });

    database.ref('setNumberOfWinners/').once('value').then((snapshot) => {
      let receivedData = Object.entries(snapshot.val());
      this.setState({ numberOfWinnersSet: receivedData[0][1]});
    });


    let confirmedWinnerList = [];
    let vals, confirmedList;

    database.ref('confirmedWinnerList/').once('value').then((snapshot) => {
      confirmedList = snapshot.val();
      if(confirmedList !== null) {
        vals = Object.keys(confirmedList).map(key => {
          return confirmedList[key];
        });
        this.setState({ confirmedListReceived: vals })
      }
    });

    database.ref('usersAll/vals').once('value').then((snapshot) => {
      let receivedData = Object.entries(snapshot.val());
      this.setState({ numberOfEntriesYesterday: receivedData.length});
    });
    this.setState({ items: this.state.users, itemWinners: this.state.winners });
  }

  filterList = (event) => {

    let updatedList = this.state.users;
    updatedList = updatedList.filter(item => {
      return item.mobileNumber.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  };

  winnerList = (event) => {

    let updatedList = this.state.winners;
    updatedList = updatedList.filter(item => {
      return item.user.mobileNumber.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({itemWinners: updatedList});
  };

  handleUsers() {
    this.setState({ handleUsers: true, showWinners: false })
  }
  handleWinners() {
    this.setState({ showWinners: true, handleUsers: false })
  }

  render() {
    const { numberOfEntriesToday, numberOfEntriesYesterday, winningNumbersToday, winningConfirmedList, numberOfWinnersSet, users, items, handleUsers, showWinners, itemWinners, confirmedListReceived } = this.state;

    return (
      <div className="container-fluid">
        <div className="data-wrapper">
          <ul className="list-group">
            <li className="list-group-item">
              <p>Users today: <span>{numberOfEntriesToday}</span></p>
              <p>Users yesterday: <span>{numberOfEntriesYesterday}</span></p>
              <p>Set winners: <span>{numberOfWinnersSet}</span></p>
              {confirmedListReceived !== undefined &&
              <div>Confirmed numbers:
                <ul className="flex-container wrap">
                  {confirmedListReceived.map((item, i) => {
                    return (<li className="flex-item" key={i}>{item.confirmedWinner.mobileNumber}</li>
                  )
                })}
                </ul>
              </div>
              }
            </li>
          </ul>
        </div>

        <h3>Users database</h3>
        <div>

          <div className="button-wrapper">
            <input
              type="button"
              className="btn btn-outline-secondary button-option main-button"
              onClick={event => this.handleUsers(event)}
              value="Daily users"
            />
            <input
              type="button"
              value="Daily winners"
              className="btn btn-outline-success button-option"
              onClick={event => this.handleWinners(event)}
            />
          </div>
          {handleUsers &&
            <section>
              <h3>Today's users</h3>
              <form>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search mobile"
                    onChange={event => this.filterList(event)}/>
                </fieldset>
              </form>
              <List
                items={items}
              />
            </section>
          }
          {showWinners &&
            <section>
              <h3>Today's winners</h3>
              <form>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search mobile"
                    onChange={event => this.winnerList(event)}/>
                </fieldset>
              </form>
              <Winners
                itemWinners={itemWinners}
              />
            </section>
          }
        </div>
      </div>
    )
  }
}

export default ManageDatabase;