import React, { Component } from 'react';

export default class DualColorPattern extends Component {

  constructor(props) {
    super(props);
    this.noClick = this.noClick.bind(this);
  }

  noClick(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div className="swatch-wrapper big" onClick={this.noClick}>
        <div className="string-color-part">
          <div ref="clickedColorSwatchLeft" className="swatch-left-double" style={{background: this.props.colorBackground1}} ></div>
          <div ref="clickedColorSwatchRight" className="swatch-right-double" style={{background: this.props.colorBackground2}} ></div>
          </div>
          <p>{this.props.colorName}</p>
      </div>
    );
  }
};
