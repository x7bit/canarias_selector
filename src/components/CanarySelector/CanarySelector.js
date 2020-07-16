import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getZone } from './helper';
import './CanarySelector.css';

class CanarySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapKey: 'canarias',
      mapLabel: '',
    };
    this.handleMove = this.handleMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMove(event) {
    const zone = getZone(event, this.state.mapKey, this.props.t);
    const newMapLabel = (zone === null) ? '' : zone.label;
    if (newMapLabel !== this.state.mapLabel) {
      this.setState({ mapLabel: newMapLabel });
    }
  }

  handleClick(event) {
    const zone = getZone(event, this.state.mapKey, this.props.t);
    const hasMap = (zone === null) ? false : zone.hasMap;
    const newMapKey = (zone === null) ? 'canarias' : zone.key;
    if (newMapKey !== this.state.mapKey) {
      if (newMapKey === 'canarias') {
        this.setState({ mapKey: newMapKey, mapLabel: '' });
        this.props.setMapKey('', false);
      } else if (this.state.mapKey === 'canarias' && hasMap) {
        this.setState( {mapKey: newMapKey, mapLabel: '' });
        if (!this.props.forceSubZone) {
          this.props.setMapKey(newMapKey, false);
        }
      } else {
        this.props.setMapKey(newMapKey, true);
      }
    }
  }

  render() {
    const { mapKey, mapLabel } = this.state;
    const url = `${process.env.PUBLIC_URL}/img/${mapKey}.png`;

    return(
      <div className="map-container">
        <div className="map-label"><b>{mapLabel}</b></div>
        <img className="responsive-img" src={url} alt="Canarias" onClick={this.handleClick} onMouseMove={this.handleMove} />
      </div>
    );
  };
}

CanarySelector.propTypes = {
  t: PropTypes.func.isRequired,
  forceSubZone: PropTypes.bool.isRequired,
  setMapKey: PropTypes.func.isRequired,  // setMapKey(mapKey, close) { ... }
};

export default withTranslation('translations')(CanarySelector);
