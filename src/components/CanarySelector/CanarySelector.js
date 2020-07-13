import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import dataCanarias from './json/canarias.json';

import './CanarySelector.css';

class CanarySelector extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  polyInside(x, y, poly) {
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

  handleClick(event) {
    const isImgOriginalSize = event.target.clientWidth === 900 && event.target.clientHeight === 500;
    const x = isImgOriginalSize ?
      event.clientX - event.target.offsetLeft :
      (event.clientX - event.target.offsetLeft) / event.target.clientWidth * 900;
    const y = isImgOriginalSize ?
      event.clientY - event.target.offsetTop :
      (event.clientY - event.target.offsetTop) / event.target.clientHeight * 500;
    for (let i = 0; i < dataCanarias.length; i++) {
      const subData = dataCanarias[i];
      if (this.polyInside(x, y, subData.poly)) {
        console.log(subData.label);
        break;
      }
    }
  }

  render() {
    const url = process.env.PUBLIC_URL + '/img/canarias.png';  //TODO: llevarlo a una función

    return(
      <div>
        <img className="responsive-img" src={url} alt="Canarias" onClick={this.handleClick} />
      </div>
    );
  };
}

/*
App.propTypes = {
  userId: PropTypes.number.isRequired,
  actions: PropTypes.object,
  view: PropTypes.string.isRequired,
  customer: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
  brands: PropTypes.arrayOf(PropTypes.object),
  sorts: PropTypes.arrayOf(PropTypes.string),
};
*/

export default CanarySelector;
