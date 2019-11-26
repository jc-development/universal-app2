import React, { Component } from 'react';

export default class StringsServingImage extends Component {
  render() {
    return (
      <div id="strings-serving-image-wrapper">
    
          <img src={this.props.color1BackgroundImage}
               id="color-1-image"
               role="presentation"
          />
          <img src={this.props.color2BackgroundImage}
               id="color-2-image"
               role="presentation"
          />
          <img src={this.props.colorServingBackgroundImage}
               id="serving-image"
               role="presentation"
          />
      </div>
    );
  }
}
