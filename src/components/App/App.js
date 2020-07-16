import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import CanarySelector from '../CanarySelector/CanarySelector'
import { getMapLabel } from '../CanarySelector/helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mapKey: '' };
    this.setMapKey = this.setMapKey.bind(this);
  }

  componentDidMount() {
    const userLanguage = navigator.language || navigator.userLanguage;
    this.props.i18n.changeLanguage(userLanguage.split('-')[0]);
  }

  setMapKey(mapKey, close) {
    this.setState({ mapKey });
  }

  render() {
    const label = getMapLabel(this.state.mapKey, this.props.t);

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

App.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withTranslation('translations')(App);
