import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import _find from 'lodash/find';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';
import AssistModal from './../modals/AssistModal';

export default class CobaltIceWax extends Component {
  constructor(props) {
    super(props);
    this.waxAccProp = {};
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleAddToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
    const that = this;
    const accessoryConfig = {
      title: that.waxAccProp.title,
      price: that.waxAccProp.variants[0].price,
      variantId: that.waxAccProp.variants[0].id
    };

    this.props.addToCart(accessoryConfig);

    TweenMax.to(".hidden-modal", 0, {display: "block"})
  }

  handleModalClose() {
    window.ga('send', 'event', 'Page Interaction');
    TweenMax.to(".hidden-modal", 0, {display: "none"})
  }

  render() {
    this.waxAccProp = _find(this.props.accessories, (prop) => {
      return prop.handle === 'cobalt-ice-string-wax'
    });

    return (
      <div>
        <Helmet>
          <title>Winner's Choice Cobalt Ice String Wax - The ideal wax to protect your Winner's Choice strings, Cobalt Ice uses WeatherLock Technology to seal, condition and protect the fibers of your strings and cables for long lasting effectiveness and ultimate performance.</title>
        </Helmet>
        <section className="" id="cobalt-ice-string-wax">
          <header>
            <h1>{this.waxAccProp.title}</h1>
          </header>
          <article className="accessory">
            <img role="presentation" className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/closeup-cobalt-wax.jpg" alt={'Winners Choice Strings - ' + this.waxAccProp.title} />
            <header>
              <h2>{this.waxAccProp.title}</h2>
            </header>
            <p>{this.waxAccProp.description === undefined ? <img className="cart-ajax-loader" src="https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif" role="presentation" /> : this.waxAccProp.description}</p>
            <p><strong>${this.waxAccProp.variants[0].price}</strong></p>
            <div className='form-inline accessory-add-section'>
              <button className="btn add-cart" onClick={this.handleAddToCart}>Add To Cart</button>
            </div>
          </article>
      </section>
      <div className='hidden-modal'>
        <div className='notify'>
          <img className='img-responsive' src="https://s3.amazonaws.com/string-builder/website-images/winners-cobalt-ice.jpg" alt={'Winners Choice Strings - ' + this.waxAccProp.title} />
          <p>added to your shopping cart</p>
          <h5>{typeof this.waxAccProp.title === 'undefined' ? 'loading' : this.waxAccProp.title}</h5>
          <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
          <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
          <AssistModal />
        </div>
      </div>
    </div>
    );
  }
}
