import React, { Component } from 'react';
import SolidColorPattern from './rendered-color-pattern/SolidColorPattern';
import DualColorPattern from './rendered-color-pattern/DualColorPattern';
import TripleColorPattern from './rendered-color-pattern/TripleColorPattern';
import TweenMax from 'gsap/TweenMax';

/*
  This is the String1 component, which is decider of which component to render SingleColorPattern,
  DoubleColorPattern, TripleColorPattern. This of this as the shell for string part 1, and it's
  child is what is rendered.
*/

export default class String2ColorPatterns extends Component {
  constructor(props) {
    super(props);
    this.selectComponentToRender = this.selectComponentToRender.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
  }

  selectComponentToRender() {
    const props = this.props.colorPattern.attributes;
    if (typeof props.hex_colors !== 'undefined') {
    switch (props.hex_colors.length) {
      case 1:
        return (<SolidColorPattern
                  colorBackground={props.hex_colors[0]}
                  colorName={props.name}
                />);
      case 2:
        return (<DualColorPattern
                  colorBackground1={props.hex_colors[0]}
                  colorBackground2={props.hex_colors[1]}
                  colorName={props.name}
                />);
      case 3:
        return (<TripleColorPattern
                  colorBackground1={props.hex_colors[0]}
                  colorBackground2={props.hex_colors[1]}
                  colorBackground3={props.hex_colors[2]}
                  colorName={props.name}
                />);
      default:
        return (<SolidColorPattern
                  colorBackground={props.hex_colors[0]}
                  colorName={props.name}
                />);
    }
  }
  }

  handleOnMouseOver(event) {
    if (document.querySelector('div.string-2.inactive') !== null)
      TweenMax.to(document.querySelector('div.string-2.inactive'), 0.5, { css: {opacity: 1} });
  }

  handleOnMouseOut(event) {
    if (document.querySelector('div.string-2.inactive') !== null)
      TweenMax.to(document.querySelector('div.string-2.inactive'), 0.5, { css: {opacity: 0.5} });
  }


  render() {
    return (
      <div>
        <div className={this.props.activeStringPart === "string-2" ? "string-2 active" : "string-2 inactive"}>
          <span className="mark-active-click" onClick={this.props.handleMarkStringPartAsActiveClick}></span>
          <h3>Strand 2 Color</h3>
          {this.selectComponentToRender()}
        </div>
        <span
          id="string-2"
          className="string-2-click-area"
          onClick={this.props.handleMarkStringPartAsActiveClick}
          onMouseOver={this.handleOnMouseOver}
          onMouseOut={this.handleOnMouseOut}
        >
        </span>
      </div>
    );
  }
};
