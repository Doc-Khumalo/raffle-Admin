import React from 'react';

class Winners extends React.Component {
  render() {
    return (
      <div>
        {this.props.itemWinners !== null &&
        <div>
          {
            this.props.itemWinners.map((item, i) => {
              return (
                <ul className="list-group" key={i}>
                  <li className="list-group-item item-user">
                    <span className="item">{item.user.mobileNumber}</span>
                    <span className="item">{item.user.selectedNetwork}</span>
                    <span className="item">{item.user.uniqueId}</span>
                  </li>
                </ul>
              )
            })
          }
        </div>
        }
        {this.props.itemWinners === null &&
          <h2>No Winners found</h2>
        }
      </div>
    )
  }
}

export default Winners;