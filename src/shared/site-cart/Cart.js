import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StringCartItem from './StringCartItem';
import DLoopAccessoryCartItem from './DLoopAccessoryCartItem';
import ButtonAccessoryCartItem from './ButtonAccessoryCartItem';
import BaseAccessoryCartItem from './BaseAccessoryCartItem';
import ServiceCartItem from './ServiceCartItem';
import TShirtAccessoryCartItem from './tShirtAccessoryCartItem';
import _reduce from 'lodash/reduce';
import _some from 'lodash/some';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _without from 'lodash/without';

import TweenMax from 'gsap/TweenMax';

import { addToCart as addToCartAction, removeFromCart as removeFromCartAction, addNitroButtonInstall as addNitroButtonInstallAction, addNitroXlButtonInstall as addNitroXlButtonInstallAction } from './assets/utilities/cart/cart-actions';


class Cart extends Component {

  constructor(props) {
    super(props);

    this.handleCartItemDelete = this.handleCartItemDelete.bind(this);
    this.areThereButtons = this.areThereButtons.bind(this);
    this.handleAddNitroBallToCart = this.handleAddNitroBallToCart.bind(this);
    this.handleAddNitroXLButtonToCart = this.handleAddNitroXLButtonToCart.bind(this);
    this.isThereFreeStringLoopAndNoSuperCustomString = this.isThereFreeStringLoopAndNoSuperCustomString.bind(this)
    // this.isThereFreeStringWaxAndFreeHatAndNoSuperCustomString = this.isThereFreeStringWaxAndFreeHatAndNoSuperCustomString.bind(this);
    // this.isThereFreeShirtAndNoSuperCustomString = this.isThereFreeShirtAndNoSuperCustomString.bind(this);

    this.handleCreateCheckout = this.handleCreateCheckout.bind(this);

    this.state = {
      nitroButtonInstall: "",
      nitroXLButtonInstall: "",
      nitroButtonInstallClicked: this.props.nitroButtonInstallClicked,
      nitroXLButtonInstallClicked: this.props.nitroXLButtonInstallClicked,
      itemTotal: parseFloat(0).toFixed(2)
    };
  }

  handleAddNitroBallToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    const nitroBallInstall = {
      name: 'Nitro Button Installation',
      price: '2.00',
      variantId: 26432954439
    }
    this.props.addToCart(nitroBallInstall);
    this.props.addNitroButtonInstall(true);

    TweenMax.set(document.querySelector('#nitro-button-install'), { autoAlpha: 0});
  }

  handleAddNitroXLButtonToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    const nitroXLButtonInstall = {
      name: 'Nitro XL Button Installation',
      price: '2.00',
      variantId: 30667019143
    }
    this.props.addToCart(nitroXLButtonInstall);
    this.props.addNitroXlButtonInstall(true);

    TweenMax.set(document.querySelector('#nitro-xl-button-install'), { autoAlpha: 0});

  }

  areThereButtons(props) {
    if (_some(props, (item) => { return (typeof item.string1ColorPatterns !== 'undefined'); })) {
      // if (this.state.nitroButtonInstallClicked === false) {
        if (_some(props, (item) => { return item.packageName === 'Nitro Balls'; })) {
              this.setState({ nitroButtonInstall: "Let us install your Nitro Balls so you don't have to." });
            } else {
              this.setState({ nitroButtonInstall: "" });
            }
      // }
      // if (this.state.nitroXLButtonInstallClicked === false) {
        if (_some(props, (item) => { return item.packageName === 'Nitro XL Buttons'; })) {
              this.setState({ nitroXLButtonInstall: "Let us install your Nitro XL Buttons so you don't have to." });
            } else {
              this.setState({ nitroXLButtonInstall: "" });
            }
      // }
    } else {
      this.setState({
        nitroButtonInstall: "",
        nitroXLButtonInstall: ""
      });
    }
  }

  isThereFreeStringLoopAndNoSuperCustomString(items) {
    let freeStringLoop = _find(items, (item) => { return item.price === "0.00" && item.packageName === 'Ultimate String Loop - 4.5 in. Package' });
    let superCustomString = _find(items, (item) => { return item.stringCustomizationLevel === "super-custom-string" && item.price === "140.00" });

    if (freeStringLoop && !superCustomString) {
      // remove free string wax
      this.props.removeFromCart(freeStringLoop.domId);
    }

  }



  componentWillReceiveProps(nextProps) {
    if (this.props.cartItems !== nextProps.cartItems) {

      if (this.props.nitroButtonInstallClicked !== nextProps.nitroButtonInstallClicked) {
        this.setState({
          nitroButtonInstallClicked: nextProps.nitroButtonInstallClicked
        });
      }

      if (this.props.nitroXLButtonInstallClicked !== nextProps.nitroXLButtonInstallClicked) {
        this.setState({
          nitroXLButtonInstallClicked: nextProps.nitroXLButtonInstallClicked
        });
      }

      if (typeof nextProps.cartItems !== 'undefined' && nextProps.cartItems.length > 0) {

        // this.isThereFreeStringLoopAndNoSuperCustomString(nextProps.cartItems)

        // handle case of deleting super custom string and removing the free shirt
        // this.isThereFreeShirtAndNoSuperCustomString(nextProps.cartItems);

        this.areThereButtons(nextProps.cartItems);

        const itemPriceArray = nextProps.cartItems.map((item) => {
          return +parseFloat(item.price).toFixed(2);
        });
        // now that have an array of prices, coerce each element to a float and then total them up.
        const total = _reduce(itemPriceArray, (sum, n) => {
          return sum + n;
        });
        return this.setState({
          itemTotal: parseFloat(total).toFixed(2)
        });
      } else {
        return this.setState({
          itemTotal: parseFloat(0).toFixed(2)
        });
      }
    }
  }

  componentDidMount() {
    // console.log('this.state: ', this.state);
    // console.log('this.props: ', this.props);
    if (typeof this.props.cartItems !== 'undefined' && this.props.cartItems.length > 0) {

      this.areThereButtons(this.props.cartItems);

      const itemPriceArray = this.props.cartItems.map((item) => {
        return +parseFloat(item.price).toFixed(2);
      });
      // now that have an array of prices, coerce each element to a float and then total them up.
      const total = _reduce(itemPriceArray, (sum, n) => {
        return sum + n;
      });
      return this.setState({
        itemTotal: parseFloat(total).toFixed(2)
      });
    } else {
      return this.state.itemTotal
    }
  }

  handleCartItemDelete(event) {
    window.ga('send', 'event', 'Page Interaction');
    // console.log(event.target.parentNode.parentNode.id);
    event.preventDefault();
    this.props.removeFromCart(event.target.parentNode.parentNode.id);
    this.areThereButtons(this.props.cartItems);

  }

  handleCreateCheckout(event) {
    event.preventDefault();
    const variantIDsURLPortion = this.props.cartItems.map((item, i) => {
      // console.log('item.variantId: ', item.variantId);
      return item.variantId + ':1'
    });

    const getDataURLPortion = this.props.cartItems.map((item, i) => {
      if (typeof item.string1ColorPatterns !== 'undefined') {
        // string
        return ('attributes[bowBrandSelected' + i + ']=' + encodeURIComponent(item.bowBrandSelected) +
                   '&attributes[bowModelSelected' + i + ']=' + encodeURIComponent(item.bowModelSelected) +
                   '&attributes[bowType' + i + ']=' + encodeURIComponent(item.bowType) +
                   '&attributes[stringLength' + i + ']=' + encodeURIComponent(item.stringLength) +
                   '&attributes[material' + i + ']=' + encodeURIComponent(item.currentMaterial) +
                   '&attributes[color1Name' + i + ']=' + encodeURIComponent(item.string1ColorPatterns.attributes.name) +
                   '&attributes[color2Name' + i + ']=' + encodeURIComponent(item.string2ColorPatterns.attributes.name) +
                   '&attributes[colorServingName' + i + ']=' + encodeURIComponent(item.servingColorPatterns.attributes.name) +
                   '&attributes[stringSet' + i + ']=' + encodeURIComponent(item.selectedStringCableSet) +
                   '&attributes[stringCustomizationLevel' + i + ']=' + encodeURIComponent(item.stringCustomizationLevel) +
                   '&attributes[price' + i + ']=' + encodeURIComponent(item.price)) +
                   '&attributes[notesToBuilder' + i + ']=' + encodeURIComponent(item.notes);
      } else {
        return null;
      }
    });
    const shopifyDatatURLFiltered = _without(getDataURLPortion, null);
    const shopifyDatatURLFilteredFinal = shopifyDatatURLFiltered.length > 0 ? `?${shopifyDatatURLFiltered.join('&')}` : ''
    const resultsForShopifyURL = 'https://store.winnerschoicestrings.com/cart/' + variantIDsURLPortion.join() + shopifyDatatURLFilteredFinal;

    // console.log('getDataURLPortion: ', getDataURLPortion);
    // console.log('shopifyDatatURLFiltered: ', shopifyDatatURLFiltered);
    // console.log('shopifyDatatURLFilteredFinal: ', shopifyDatatURLFilteredFinal);
    // console.log('resultsForShopifyURL: ', resultsForShopifyURL);

    this.setState({
      shopifyURL: resultsForShopifyURL
    }, () => {
      const openShopify = window.open(this.state.shopifyURL, '_blank')
      openShopify.focus()
     });
  }


  render() {
    // console.log('this.props.cartItems: ', this.props.cartItems);
    const cartItemNodes = this.props.cartItems.map((item, i) => {
      let cartItem = {};
      if (typeof item.string1ColorPatterns !== 'undefined') {
        cartItem = <StringCartItem
                    color1={item.string1ColorPatterns.attributes.string2_location}
                    color2={item.string2ColorPatterns.attributes.string1_location}
                    colorServing={item.servingColorPatterns.attributes.serving_location}
                    bowType={item.bowType}
                    selectedStringCableSet={item.selectedStringCableSet}
                    price={item.price}
                    handleCartItemDelete={this.handleCartItemDelete}
                    domId={item.domId}
                    key={i}
                   />
      } else if (typeof item.packageName !== 'undefined') {
        // d-loop or t-shirt or button
        if (item.packageName === 'Ultimate String Loop - 4.5 in. Package' || item.packageName === 'Ultimate String Loop - 2ft. Package') {
          // it's a dloop
          cartItem = <DLoopAccessoryCartItem
                      colorName={item.colorName}
                      packageName={item.packageName}
                      price={item.price}
                      handleCartItemDelete={this.handleCartItemDelete}
                      domId={item.domId}
                      key={i}
                     />
        } else if (item.packageName === "Winner's Choice 60X T-Shirt") {
          cartItem = <TShirtAccessoryCartItem
                      sizeName={item.colorName}
                      packageName={item.packageName}
                      price={item.price}
                      handleCartItemDelete={this.handleCartItemDelete}
                      domId={item.domId}
                      key={i}
                     />
        } else {
          // ********* its a button - here we can ask if they want to have us install it.
          cartItem = <ButtonAccessoryCartItem
                      colorName={item.colorName}
                      packageName={item.packageName}
                      price={item.price}
                      handleCartItemDelete={this.handleCartItemDelete}
                      domId={item.domId}
                      key={i}
                     />
        }
      } else if (typeof item.title !== 'undefined') {
        // cobalt or hat
        cartItem = <BaseAccessoryCartItem
                     title={item.title}
                     price={item.price}
                     handleCartItemDelete={this.handleCartItemDelete}
                     domId={item.domId}
                     key={i}
                   />
      } else if (typeof item.name !== 'undefined') {
        // install service
        cartItem = <ServiceCartItem
                    name={item.name}
                    price={item.price}
                    domId={item.domId}
                    handleCartItemDelete={this.handleCartItemDelete}
                    />
      }
      else {
        cartItem = <td>Nothing in your cart</td>
      }
      return (
        cartItem
      );
    });

    return (
      <section>
        <article className="cart-items-wrapper">
        <img className="img-responsive ships-in-days-builder" src="https://string-builder.s3.amazonaws.com/website-images/black-friday-2019/WC-banner-blackfriday-banner.jpg" alt="25% Off on Winner's Choice Custom String Sets" role="presentation" />
          <h1>MY CART</h1>
          <div className="row">
            <table className="table striped col-md-8">
              <tbody>
                {(typeof cartItemNodes === 'undefined' || cartItemNodes.length < 1) ? <tr><td colSpan="3" className="no-cart-item-header">No items in cart</td><td className="no-cart-items"><dl><dt><Link to="/string-builder/step-1">Build <strong><em>your</em></strong> strings &amp; cables</Link> with the best in the business</dt><dd>Prolong your Winner's Choice string life! Use <Link to="/winners-choice-accessories/cobalt-ice-string-wax">Cobalt String Wax</Link></dd><dd><Link to="/winners-choice-accessories/ultimate-string-loop">D-Loops available</Link> in multiple colors and patterns for both target and hunting.</dd></dl></td></tr> : cartItemNodes}
                </tbody>
                {(this.state.nitroButtonInstallClicked === true || this.props.cartItems.length < 1 || this.state.nitroButtonInstall === "") ? null : <tr className="col-md-12" id="nitro-button-install"><td>{this.state.nitroButtonInstall}</td><td><button className="btn btn-primary" onClick={this.handleAddNitroBallToCart}>$2.00 - Yes, install my Nitro Balls</button></td></tr>}
                {(this.state.nitroXLButtonInstallClicked === true || this.props.cartItems.length < 1 || this.state.nitroXLButtonInstall === "") ? null : <tr className="col-md-12" id="nitro-xl-button-install"><td>{this.state.nitroXLButtonInstall}</td><td><button className="btn btn-primary" onClick={this.handleAddNitroXLButtonToCart}>$2.00 - Yes, install my Nitro XL Buttons</button></td></tr>}
            </table>

            <div className="col-md-4">
              <div className="total-wrapper">
                <h4>Grand Total: USD ${this.state.itemTotal}</h4>
                <Link to="/checkout" onClick={this.handleCreateCheckout}><button className="btn btn-primary">Proceed To Checkout</button></Link>
                <p>Shipping will be calculated on checkout</p>
                <p className="notice">FREE SHIPPING AVAILABLE</p>
                <p className="purchase-disclaimer">* Due to the custom nature of the product, Winners Choice is not responsible for changes to build after the sale has been processed. All sales are final.</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    );
  }
}

const mapStateToProps = ({cartState}) => {
  return {
    cartItems: cartState.items,
    nitroButtonInstallClicked: cartState.nitroButtonInstallClicked,
    nitroXLButtonInstallClicked: cartState.nitroXLButtonInstallClicked
  }
}

export default connect(mapStateToProps, {addToCart: addToCartAction, removeFromCart: removeFromCartAction, addNitroButtonInstall: addNitroButtonInstallAction, addNitroXlButtonInstall: addNitroXlButtonInstallAction})(Cart);
