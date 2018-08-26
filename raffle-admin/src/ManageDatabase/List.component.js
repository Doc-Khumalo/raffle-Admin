import React, { Component } from 'react';
import './List.css';

class List extends Component {
  render() {
    return (
      <div>
        {
          this.props.items.map((item, i) => {
            return (
              <ul className="list-group" key={i}>
                <li className="list-group-item item-user">
                  <span className="item">{item.fullName}</span>
                  <span className="item">{item.mobileNumber}</span>
                  <span className="item">{item.selectedNetwork}</span>
                  <span className="item">{item.uniqueId}</span>
                </li>
              </ul>
            )
          })
        }
      </div>
    )
  }
}

export default List;