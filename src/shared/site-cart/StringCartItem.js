import React, { Component } from 'react';


/*
  In here take the price out of the prop.
*/

export default class StringCartItem extends Component {
  render() {
    return (
      <tr id={this.props.domId}>
        { window.innerWidth > 1024 ?
        <td className="cart-img">
          <div className="small-preview-strings-serving-image-wrapper">
            <img src={this.props.color1}
                 className="color-1-image"
                 role="presentation"
            />
            <img src={this.props.color2}
                 className="color-2-image"
                 role="presentation"
            />
            <img src={this.props.colorServing}
                 className="serving-image"
                 role="presentation"
            />
          </div>
        </td>
        : <td className="mobile-cart-string" colSpan={2}>
          <div className="small-preview-strings-serving-image-wrapper">
            <img src={this.props.color1}
                 className="color-1-image"
                 role="presentation"
            />
            <img src={this.props.color2}
                 className="color-2-image"
                 role="presentation"
            />
            <img src={this.props.colorServing}
                 className="serving-image"
                 role="presentation"
            />
          </div>
          <p><strong>{this.props.selectedStringCableSet}</strong><br/>{this.props.bowType} bow</p>
          <a href='#' onClick={this.props.handleCartItemDelete}>Remove</a>
        </td>
        }
        { window.innerWidth > 1024 ?
        <td>
          <p><strong>{this.props.selectedStringCableSet}</strong><br/>{this.props.bowType} bow</p>
          <a href='#' onClick={this.props.handleCartItemDelete}>Remove</a>
        </td>
        : '' }
        { window.innerWidth > 1024 ?
        <td className="price">
          ${this.props.price}
        </td>
        : <td className="mobile-cart-string price">
          ${this.props.price}
        </td>
        }

      </tr>
    )
  }
}
