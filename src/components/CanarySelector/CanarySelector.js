import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import './CanarySelector.css';

class CanarySelector extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const isImgOriginalSize = event.target.clientWidth === 900 && event.target.clientHeight === 500;
    const x = isImgOriginalSize ?
      event.clientX - event.target.offsetLeft :
      (event.clientX - event.target.offsetLeft) / event.target.clientWidth * 900;
    const y = isImgOriginalSize ?
      event.clientY - event.target.offsetTop :
      (event.clientY - event.target.offsetTop) / event.target.clientHeight * 500;
    console.log(x, y);
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
