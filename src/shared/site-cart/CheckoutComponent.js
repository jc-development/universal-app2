import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import TweenMax from 'gsap/TweenMax';
import _without from 'lodash/without';

class CheckoutComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shopifyURL: 'https://winners-choice-strings.myshopify.com/cart/',
      newTab: false
    };

    this.cartAjaxLoader = null
    this.iframeObject = null

    this.iframeLoaded = this.iframeLoaded.bind(this)
    this.closeCheckout = this.closeCheckout.bind(this)
  }

  componentDidMount() {

    // iframe object
    this.iframeObject = document.getElementById('checkout-frame')

    //ajax loader
    this.cartAjaxLoader = document.querySelector('.cart-ajax-loader')
    TweenMax.set(this.cartAjaxLoader, {autoAlpha: 1})

    // detect if mobile device or safari browser
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    const isSafari = navigator.userAgent.indexOf('Safari') > -1;
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1

      // open in newtab or iframe
      // if ( isSafari && (!isChrome || isMobile) ) {

        this.setState({
          newTab: true
        }, function () { return this.state })

      //
      // } else {
      //   this.setState({
      //     newTab: false
      //   }, function () { return this.state })
      // }



    // console.log('this.props.cartItems: ', this.props.cartItems);

    const variantIDsURLPortion = this.props.cartItems.map((item, i) => {
      // console.log('item.variantId: ', item.variantId);
      return item.variantId + ':1'
    });

    const getDataURLPortion = this.props.cartItems.map((item, i) => {
      if (typeof item.string1ColorPatterns !== 'undefined') {
        // string
        return ('?attributes[bowBrandSelected' + i + ']=' + item.bowBrandSelected +
                   '&attributes[bowModelSelected' + i + ']=' + item.bowModelSelected +
                   '&attributes[bowType' + i + ']=' + item.bowType +
                   '&attributes[stringLength' + i + ']=' + item.stringLength +
                   '&attributes[material' + i + ']=' + item.currentMaterial +
                   '&attributes[color1Name' + i + ']=' + item.string1ColorPatterns.attributes.name +
                   '&attributes[color2Name' + i + ']=' + item.string2ColorPatterns.attributes.name +
                   '&attributes[colorServingName' + i + ']=' + item.servingColorPatterns.attributes.name +
                   '&attributes[stringSet' + i + ']=' + item.selectedStringCableSet +
                   '&attributes[stringCustomizationLevel' + i + ']=' + item.stringCustomizationLevel +
                   '&attributes[price' + i + ']=' + item.price) +
                   '&attributes[notesToBuilder' + i + ']=' + item.notes;
      } else {
        return null;
      }
    });

    const shopifyDatatURLFiltered = _without(getDataURLPortion, null);
    // "https://winners-choice-strings.myshopify.com/cart/26433125511:1?attributes[name0]=Winner's Choice Logo Hat&attributes[price0]=19.99" <= works
    const resultsForShopifyURL = 'https://winners-choice-strings.myshopify.com/cart/' + variantIDsURLPortion.join() +  shopifyDatatURLFiltered.join();

    // console.log('getDataURLPortion: ', getDataURLPortion);
    // console.log('shopifyDatatURLFiltered: ', shopifyDatatURLFiltered);
    // console.log('resultsForShopifyURL: ', resultsForShopifyURL);

    this.setState({
      shopifyURL: resultsForShopifyURL
    }, () => { return this.state; });


  }

  openNewTab () {
    const openShopify = window.open(this.state.shopifyURL, '_blank')
    openShopify.focus()
  }


  iframeLoaded () {
      TweenMax.to(this.cartAjaxLoader, 0.25, {autoAlpha: 0})
  }

  closeCheckout () {
    this.iframeObject.data = ''
    browserHistory.goBack()
  }
  render() {
    // open new tab on render for shopify checkout
    if (this.state.newTab === true) {
      this.openNewTab();
      browserHistory.goBack()
    }

    return (
      <div>
        <button onClick={this.closeCheckout} className="btn btn-checkout-close">Close Checkout</button>
        {this.state.newTab ? '' : <img className="cart-ajax-loader" src="https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif" role="presentation" />}

        {this.state.newTab ? '': <object id="checkout-frame" ref="iframe" data={this.state.shopifyURL} onLoad={this.iframeLoaded}></object>}
      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return {
    cartItems: store.cartState.items
  }
}

export default connect(mapStateToProps)(CheckoutComponent);
