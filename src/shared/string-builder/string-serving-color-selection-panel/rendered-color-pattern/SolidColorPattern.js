import React, { Component } from 'react';

export default class SolidColorPattern extends Component {

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
          <div className="string-color-part" style={{background: this.props.colorBackground}}></div>
          <p>{this.props.colorName}</p>
      </div>
    );
  }
}
