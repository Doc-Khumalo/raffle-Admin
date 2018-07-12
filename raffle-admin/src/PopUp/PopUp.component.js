import React from 'react';
import './PopUp.css'

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popupInner'>
          {this.props.info}
          <div>
            <button className="popUpButton" onClick={this.props.closePopup}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;