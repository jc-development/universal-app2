import React, { Component } from 'react';

export default class TripleColorPattern extends Component {

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
          <div className="swatch-left-triple" style={{background: this.props.colorBackground1}} ></div>
          <div className="swatch-middle-triple" style={{background: this.props.colorBackground2}} ></div>
          <div className="swatch-right-triple" style={{background: this.props.colorBackground3}} ></div>
        </div>
        <p>{this.props.colorName}</p>
    </div>
    );
  }
};
