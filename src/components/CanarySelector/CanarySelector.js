import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { data } from './data';

import './CanarySelector.css';

class CanarySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: 'canarias',
      label: '',
    };
    this.handleMove = this.handleMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  _polyInside(x, y, poly) {
    let isInside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        let xi = poly[i][0], yi = poly[i][1];
        let xj = poly[j][0], yj = poly[j][1];
        let intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            isInside = !isInside;
        }
    }
    return isInside;
  }

  _getZone(event, data) {
    if (data && Array.isArray(data)) {
      const isImgOriginalSize = event.target.clientWidth === 900 && event.target.clientHeight === 500;
      const x = isImgOriginalSize ?
        event.clientX - event.target.offsetLeft :
        (event.clientX - event.target.offsetLeft) / event.target.clientWidth * 900;
      const y = isImgOriginalSize ?
        event.clientY - event.target.offsetTop :
        (event.clientY - event.target.offsetTop) / event.target.clientHeight * 500;
      for (let i = 0; i < data.length; i++) {
        if (this._polyInside(x, y, data[i].poly)) {
          return {
            key: data[i].key,
            label: data[i].label,
            hasMap: data[i].hasMap,
          };
        }
      }
    }
    return null;
  }

  handleMove(event) {
    const zone = this._getZone(event, data[this.state.map]);
    const newLabel = (zone === null) ? '' : zone.label;
    if (newLabel !== this.state.label) {
      this.setState({ label: newLabel });
    }
  }

  handleClick(event) {
    const zone = this._getZone(event, data[this.state.map]);
    const hasMap = (zone === null) ? false : zone.hasMap;
    const newMap = (zone === null) ? 'canarias' : zone.key;
    if (newMap !== this.state.map) {
      if (newMap === 'canarias') {
        this.setState({ map: newMap, label: '' });
        this.props.setZone('', false);
      } else if (this.state.map === 'canarias' && hasMap) {
        this.setState( {map: newMap, label: '' });
        if (!this.props.forceSubZone) {
          this.props.setZone(newMap, false);
        }
      } else {
        this.props.setZone(newMap, true);
      }
    }
  }

  render() {
    const { map, label } = this.state;
    const url = `${process.env.PUBLIC_URL}/img/${map}.png`;

    return(
      <div className="map-container">
        <div className="map-label"><strong>{label}</strong></div>
        <img className="responsive-img" src={url} alt="Canarias" onClick={this.handleClick} onMouseMove={this.handleMove} />
      </div>
    );
  };
}

CanarySelector.propTypes = {
  forceSubZone: PropTypes.bool.isRequired,
  setZone: PropTypes.func.isRequired,  // setZone(zone, close) { ... }
};

export default CanarySelector;
