import React, { Component } from 'react';

export default class ButtonAccessoryCartItem extends Component {
  render() {
    const getProperImage = () => {
      if (this.props.packageName === "Nitro Balls") {
        return 'https://s3.amazonaws.com/string-builder/website-images/winners-buttons.jpg';
      } else {
        return 'https://s3.amazonaws.com/string-builder/website-images/winners-xl-buttons.jpg';
      }
    }
    return (
      <tr id={this.props.domId}>
        <td className="cart-img"><img className="img-responsive" src={getProperImage()} role="presentation" /></td>
        <td>
          <p><strong>{this.props.packageName}</strong><br/>{this.props.colorName}</p>
          <a href="#" onClick={this.props.handleCartItemDelete}>Remove</a>
        </td>
        <td className="price">${this.props.price}</td>
      </tr>
    );
  }
}
