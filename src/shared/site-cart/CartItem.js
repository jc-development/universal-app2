import React from 'react'

export default class CartItem extends React.Component {

  render () {
    if (typeof this.props.name === 'undefined') {
      return (
        <div className="row cart-item-wrapper" data-cart-item-id={this.props.cartItemID}>
          <h4 className="col-sm-7">String: {this.props.customizationLevel}</h4>
          <ul className="specs col-sm-3">
            <li><strong>Bow Type:</strong> {this.props.bowType}</li>
            <li><strong>Material:</strong> {this.props.showingSwatchesForMaterials}</li>
            <li><strong>Color 1:</strong> {this.props.color1Name}</li>
            <li><strong>Color 2:</strong> {this.props.color2Name}</li>
            <li><strong>Serving:</strong> {this.props.colorServingName}</li>
            <li><strong>Price:</strong> {this.props.stringSet}</li>
          </ul>
          <div className="col-sm-2">
            <a onClick={this.props.handleCartItemDelete} role="button" className="btn">Remove</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row cart-item-wrapper" data-cart-item-id={this.props.cartItemID}>
          <h4 className="col-sm-7">{this.props.name}</h4>
          <p className="col-sm-3"><strong>Price:</strong> {this.props.price}</p>
          <div className="col-sm-2 cart-item-remove">
            <a onClick={this.props.handleCartItemDelete} role="button" className="btn">Remove</a>
          </div>
        </div>
      )
    }

  }
}
