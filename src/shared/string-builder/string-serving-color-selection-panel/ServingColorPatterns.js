import React, { Component } from 'react';
import SolidColorPattern from './rendered-color-pattern/SolidColorPattern';
import TweenMax from 'gsap/TweenMax';

export default class ServingColorPatterns extends Component {
  constructor(props) {
    super(props);

    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
  }

  handleOnMouseOver(event) {
    if (document.querySelector('div.serving.inactive') !== null)
      TweenMax.to(document.querySelector('div.serving.inactive'), 0.5, { css: {opacity: 1} });
  }

  handleOnMouseOut(event) {
    if (document.querySelector('div.serving.inactive') !== null)
      TweenMax.to(document.querySelector('div.serving.inactive'), 0.5, { css: {opacity: 0.5} });
  }

  render() {
    const props = this.props.colorPattern.attributes;
    return (
      <div>
        <div className={this.props.activeStringPart === "serving" ? "serving active" : "serving inactive"}>
          <span className="mark-active-click"></span>
          <h3>Serving Color</h3>
          {typeof props.hex_colors !=='undefined' ? <SolidColorPattern
                  colorBackground={props.hex_colors[0]}
                  colorName={props.name}
              /> : <SolidColorPattern
                colorBackground={"https://s3.amazonaws.com/string-builder/serving/white.png"}
                colorName={this.props.name}
            /> }
        </div>
        <span
          id="serving"
          className="serving-click-area"
          onClick={this.props.handleMarkStringPartAsActiveClick}
          onMouseOver={this.handleOnMouseOver}
          onMouseOut={this.handleOnMouseOut}
        ></span>
      </div>
    );
  }
};
