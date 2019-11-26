import React, { Component } from 'react';
import String1ColorPatterns from './String1ColorPatterns';
import String2ColorPatterns from './String2ColorPatterns';
import ServingColorPatterns from './ServingColorPatterns';

/*
  This is just a holder of sorts. It passes colorPattern props to its children from
  its parent. The children decide what to render (solid, double, or triple) based on the props
  that are passed in.
*/

export default class StringServingColorSelectionPanel extends Component {

  render() {
    return (
      <div id="string-serving-color-selection-panel">
        <String1ColorPatterns activeStringPart={this.props.activeStringPart} colorPattern={this.props.string1ColorPatterns} handleMarkStringPartAsActiveClick={this.props.handleMarkStringPartAsActiveClick} />
        <String2ColorPatterns activeStringPart={this.props.activeStringPart} colorPattern={this.props.string2ColorPatterns} handleMarkStringPartAsActiveClick={this.props.handleMarkStringPartAsActiveClick} />
        <ServingColorPatterns activeStringPart={this.props.activeStringPart} colorPattern={this.props.servingColorPatterns} handleMarkStringPartAsActiveClick={this.props.handleMarkStringPartAsActiveClick} />
      </div>
    );
  }
}
