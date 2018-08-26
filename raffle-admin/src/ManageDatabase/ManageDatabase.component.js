import React, { Component } from 'react';
import fire from '../fire';
import List from './List.component'
import './List.css';


const database = fire.database();
let receivedDataUsers;
let dataToSearch = [];
database.ref('users/').once('value').then((snapshot) => {
  receivedDataUsers = Object.entries(snapshot.val());
  receivedDataUsers.map(item => {
    dataToSearch.push(item[1].user)
  });
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
      items: []
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

    database.ref('usersAll/vals').once('value').then((snapshot) => {
      let receivedData = Object.entries(snapshot.val());
      this.setState({ numberOfEntriesYesterday: receivedData.length});
    });
    this.setState({ items: this.state.users});
  }

  filterList = (event) => {

    let updatedList = this.state.users;
    updatedList = updatedList.filter(item => {
      return item.mobileNumber.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  };

  render() {
    const { numberOfEntriesToday, numberOfEntriesYesterday, winningNumbersToday, winningConfirmedList, numberOfWinnersSet, users, items } = this.state;

    return (
      <div className="container-fluid">
        <div className="data-wrapper">
          <ul className="list-group">
            <li className="list-group-item">
              <p>Users today: <span>{numberOfEntriesToday}</span></p>

              <p>Users yesterday: <span>{numberOfEntriesYesterday}</span></p>

              <p>Set winners: <span>{numberOfWinnersSet}</span></p>

              <p>Winning numbers: <span>{winningNumbersToday} @TODO</span></p>

              <p>Confirmed numbers: <span>{winningConfirmedList} @TODO</span></p>
            </li>
          </ul>
        </div>

        <h3>Users database</h3>
        <div>
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search"
                onChange={event => this.filterList(event)}/>
            </fieldset>
          </form>
          <List
            items={items}
          />
        </div>
      </div>
    )
  }
}

export default ManageDatabase;