import React, { Component } from 'react';

export default class ServiceCartItem extends Component {
  render() {
    return (
      <tr id={this.props.domId}>
        <td>
          <p><strong>{this.props.name}</strong></p>
          <a href="#" onClick={this.props.handleCartItemDelete}>Remove</a>
        </td>
        <td className="price">${this.props.price}</td>
      </tr>
    );
  }
}
