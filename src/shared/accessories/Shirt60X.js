import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import _filter from 'lodash/filter';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';
import AssistModal from './../modals/AssistModal';


export default class Shirt60X extends Component {
  constructor(props) {
    super(props);
    this.shirt60xApparel = {};
    this.selectedShirtSize = {};
    this.handleShirtSizeChange = this.handleShirtSizeChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }



  handleShirtSizeChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    const sizeName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('value');
    const price = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-price');
    const packageName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-package');
    const variantId = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant');

    return this.selectedShirtSize = {
      packageName: packageName,
      sizeName: sizeName,
      price: price,
      variantId: variantId
    }

  }

  handleAddToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();

    if (event.currentTarget.parentNode.childNodes[0].options.selectedIndex !== 0) {
      const apparelConfig = this.selectedShirtSize;
      this.props.addToCart(apparelConfig);

      TweenMax.to(".hidden-modal", 0, {display: "block"})
    } else {
      console.log('Not going to do it. You need a shirt size!');
    }

  }

  handleModalClose() {
    window.ga('send', 'event', 'Page Interaction');
    TweenMax.to(".hidden-modal", 0, {display: "none"})
  }

  render() {
    this.shirt60xApparel = _filter(this.props.apparel, (apparel) => {
       return (apparel.handle === 'winners-choice-60x-t-shirt')
    });
    //
    const getShirtSizes = (accessory) => {
      const shirtSizeNodes = accessory.variants.map( (size, i) => {
        return (<option key={i} value={size.title} data-package={"Winner's Choice 60X T-Shirt"} data-price={size.price} data-variant={size.id}>{size.title}</option>)
      });
      return shirtSizeNodes;
    }

    const get60xShirt = () => {
      if (typeof this.shirt60xApparel !== 'undefined') {
        const shirtNodes = this.shirt60xApparel.map( (accessory, i) => {
          return (
            <article className="accessory">
              <img role="presentation" className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/wc-60xbetter-tee.jpg" alt='Winners Choice Strings - T-Shirt 60X Better than the competition' />
              <header>
                <h2>{accessory.title}</h2>
                <p>{accessory.description}</p>
                <p><strong>${accessory.variants[0].price}</strong></p>
              </header>
              <div className='form-inline accessory-add-section'>
                <fieldset className='form-group select-group'>
                  <label htmlFor='variants-60x-shirt-size'>SELECT YOUR SHIRT SIZE</label>

                  <div className="col-md-12">
                    <select id='variants-60x-shirt-size' className='form-control'
                            name='variants-60x-shirt-size' onChange={this.handleShirtSizeChange}>
                      <option>Please select a shirt size</option>
                      {getShirtSizes(accessory)}
                    </select>
                    <button className="btn accessory-add add-cart" onClick={this.handleAddToCart}>Add To Cart</button>
                  </div>

                </fieldset>
              </div>
            </article>
          );
        });
        return shirtNodes;
      } else {
        return <h1>Loading ...</h1>;
      }
    }
    return (
      <div>
        <Helmet>
          <title>Winner's Choice Ultimate String Loops - Our ultimate string loop material is the best the industry has to offer. Available in a variety of colors to add to the personalization of your custom string. Each package includes either 4.5-inch and 2-foot sections in either 1.8 (target) or 2.0mm (hunting) diameters</title>
        </Helmet>
        <section className="" id="t-shirt-60x">
            <header>
              <h1>Winner's Choice 60X T-Shirt</h1>
            </header>
            {get60xShirt().length === 0 ?  <img className="cart-ajax-loader" src="https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif" role="presentation" /> : get60xShirt()}
        </section>
        <div className='hidden-modal'>
          <div className='notify'>
            <img className='img-responsive' src="https://s3.amazonaws.com/string-builder/website-images/wc-60xbetter-tee.jpg" alt='Winners Choice Strings - T-Shirt 60X Better than the competition' />
            <p>added to your shopping cart</p>
            <h5>Winner's Choice 60X T-Shirt</h5>
            <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
            <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
            <AssistModal />
          </div>
        </div>
    </div>
    );
  }
}
