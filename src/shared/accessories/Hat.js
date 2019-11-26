import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import _find from 'lodash/find';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';
import AssistModal from './../modals/AssistModal';

export default class Hat extends Component {

  constructor(props) {
    super(props);
    this.hatAccProp = {};
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

  }

  handleAddToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
    const that = this;
    const accessoryConfig = {
      title: that.hatAccProp.title,
      price: that.hatAccProp.variants[0].price,
      variantId: that.hatAccProp.variants[0].id
    };

    this.props.addToCart(accessoryConfig);

    TweenMax.to(".hidden-modal", 0, {display: "block"})
  }

  handleModalClose() {
    window.ga('send', 'event', 'Page Interaction');
    TweenMax.to(".hidden-modal", 0, {display: "none"})
  }

  render() {
    this.hatAccProp = _find(this.props.apparel, (prop) => {
      return prop.handle === 'winners-choice-logo-hat'
    });

    return (
      <div>
        <Helmet>
          <title>Winner's Choice Logo Hat - Comfortable, unstructured, 6-panel hat with Winner’s Choice logo on the front and an adjustable back. One size fits most.</title>
        </Helmet>
        <section className="" id="hat">
            <header>
              <h1>{this.hatAccProp.title}</h1>
            </header>
            <article className="accessory">
              <img className="img-responsive" role="presentation" src="https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg" alt={'Winners Choice Strings - ' + this.hatAccProp.title} />
              <header>
                <h2>{this.hatAccProp.title}</h2>
              </header>
              <p>{this.hatAccProp.description === undefined ?  <img className="cart-ajax-loader" src="https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif" role="presentation" /> : this.hatAccProp.description}</p>
              <p><strong>${this.hatAccProp.variants[0].price}</strong></p>
              <div className='form-inline accessory-add-section'>
                <button className="btn add-cart" onClick={this.handleAddToCart}>Add To Cart</button>
              </div>
            </article>
        </section>
        <div className='hidden-modal'>
          <div className='notify'>
            <img className='img-responsive' src="https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg" alt={'Winners Choice Strings - ' + this.hatAccProp.title} />
            <p>added to your shopping cart</p>
            <h5>{typeof this.hatAccProp.title === 'undefined' ? 'loading' : this.hatAccProp.title}</h5>
            <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
            <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
            <AssistModal />
          </div>
        </div>
      </div>
    );
  }
}
