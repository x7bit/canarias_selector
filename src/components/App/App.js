import React, { Component } from 'react';

import CanarySelector from '../CanarySelector/CanarySelector'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zone: '' };
    this.setZone = this.setZone.bind(this);
  }

  setZone(zone) {
    this.setState({ zone });
  }

  render() {
    return(
      <div>
        <CanarySelector setZone={this.setZone} />
        <div style={{textAlign: 'center'}}>{this.state.zone}</div>
      </div>
    );
  };
}

export default App;
