import React, { Component } from 'react';

export default class DLoopAccessoryCartItem extends Component {
  render() {
    return (
      <tr id={this.props.domId}>
        <td className="cart-img"><img  src="https://s3.amazonaws.com/string-builder/website-images/D-Loop-Camo.jpg" role="presentation" /></td>
        <td>
          <p><strong>{this.props.packageName}</strong><br/>{this.props.colorName}</p>
           <a href="#" onClick={this.props.handleCartItemDelete}>Remove</a>
         </td>
        <td className="price">${this.props.price}</td>
      </tr>
    );
  }
}
