import React, { Component } from 'react';

export default class BaseAccessoryCartItem extends Component {
  render() {
    // console.log('this.props: ', this.props);
    const properImage = () => {
      if (this.props.title === "Winner's Choice Logo Hat") {
        return 'https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg'
      } else {
        return 'https://s3.amazonaws.com/string-builder/website-images/winners-cobalt-ice.jpg'
      }
    }
    return (
      <tr id={this.props.domId}>
        <td className="cart-img"><img src={properImage()} role="presentation" /></td>
        <td><p><strong>{this.props.title}</strong></p> <a href="#" onClick={this.props.handleCartItemDelete}>Remove</a></td>
        <td className="price">${this.props.price}</td>
      </tr>
    );
  }
}
