import React, { Component } from 'react';

import CanarySelector from '../CanarySelector/CanarySelector'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zone: '' };
    this.setZone = this.setZone.bind(this);
  }

  setZone(zone, close) {
    this.setState({ zone });
  }

  render() {
    return(
      <div>
        <CanarySelector
          forceSubZone={false}
          setZone={this.setZone}
        />
        <div style={{textAlign: 'center', color: 'red'}}><i>{this.state.zone}</i></div>
      </div>
    );
  };
}

export default App;
