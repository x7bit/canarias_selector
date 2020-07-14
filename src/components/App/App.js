import React, { Component } from 'react';

import CanarySelector from '../CanarySelector/CanarySelector'
import { getMapLabel } from '../CanarySelector/helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mapKey: '' };
    this.setMapKey = this.setMapKey.bind(this);
  }

  setMapKey(mapKey, close) {
    this.setState({ mapKey });
  }

  render() {
    const label = getMapLabel(this.state.mapKey);

    return(
      <div>
        <CanarySelector
          forceSubZone={false}
          setMapKey={this.setMapKey}
        />
        <div style={{textAlign: 'center', color: 'Tomato', minHeight: '25px'}}><i>{label}</i></div>
      </div>
    );
  };
}

export default App;
