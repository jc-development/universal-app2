import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import _filter from 'lodash/filter';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';
import AssistModal from './../modals/AssistModal';


export default class UltimateStringLoop extends Component {
  constructor(props) {
    super(props);
    this.dLoopAcc = {};
    this.handleDLoopChange = this.handleDLoopChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }


  // NEED TO BETTER HANDLE - IT WILL CREATE BUGS -- may need state to reflect current selection --- in other words, hold the results of the change event

  getProperProductId(packageName) {
    if (packageName === 'Ultimate String Loop - 2ft. Package') {
      return 8231891271
    } else {
      return 8231875911
    }
  }

  handleDLoopChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    const colorName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('value');
    const price = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-price');
    const packageName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-package');
    const variantId = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant');

    return this.dLoopAcc = {
      packageName: packageName,
      colorName: colorName,
      price: price,
      variantId: variantId
    }

  }

  handleAddToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();

    if (event.currentTarget.parentNode.childNodes[1].options.selectedIndex !== 0) {
      const accessoryConfig = this.dLoopAcc;
      this.props.addToCart(accessoryConfig);

      TweenMax.to(".hidden-modal", 0, {display: "block"})
    } else {
      console.log('not going to do it. pick a color from dropdown');
    }

  }

  handleModalClose() {
    window.ga('send', 'event', 'Page Interaction');
    TweenMax.to(".hidden-modal", 0, {display: "none"})
  }

  render() {
    const stringLoopAccArr = _filter(this.props.accessories, (accessory) => {
       return (accessory.handle === 'ultimate-string-loop-2-ft-package' || accessory.handle === 'ultimate-string-loop-4-5-in-package')
    });

    const getHuntColors = (accessory) => {
      const huntingColors = _filter(accessory.variants, (variant) => {
        return variant.title.includes("Hunting")
      });
      const huntingColorNodes = huntingColors.map( (color, i) => {
        return (<option key={i} value={color.title} data-package={color.price === "5.00" ? "Ultimate String Loop - 4.5 in. Package" : "Ultimate String Loop - 2ft. Package"} data-price={color.price} data-variant={color.id}>{color.title}</option>)
      });
      return huntingColorNodes;
    }

    const getTargetColors = (accessory) => {
      const targetColors = _filter(accessory.variants, (variant) => {
        return variant.title.includes("Target")
      });
      const targetColorNodes = targetColors.map( (color, i) => {
        return (<option key={i} value={color.title} data-package={color.price === "5.00" ? "Ultimate String Loop - 4.5 in. Package" : "Ultimate String Loop - 2ft. Package"} data-price={color.price} data-variant={color.id}>{color.title}</option>)
      });
      return targetColorNodes;
    }

    const getStringLoops = () => {
      if (typeof stringLoopAccArr !== 'undefined') {
        const stringLoopAccNodes = stringLoopAccArr.map( (accessory, i) => {
          return (
            <article className="accessory">
              <img role="presentation" className="img-responsive loop" src="https://s3.amazonaws.com/string-builder/website-images/D-Loop-Camo.jpg" alt='Winners Choice Strings - Ultimate String Loop' />
              <header>
                <h2>{accessory.title}</h2>
                <p><strong>${accessory.variants[0].price}</strong></p>
              </header>
              <div className='form-inline accessory-add-section'>
                <fieldset className='form-group select-group'>
                  <label htmlFor='variants-ultimate-string-loop-4.5in'>SELECT YOUR TYPE AND COLOR</label>

                <div className="">
                  <div className="col-md-6">
                    <h5>Hunting Colors (2 mm)</h5>
                    <select id='variants-ultimate-string-loop-4.5in' className='form-control'
                            name='variants-ultimate-string-loop-4.5in' onChange={this.handleDLoopChange}>
                      <option>Please select a color</option>
                      {getHuntColors(accessory)}
                    </select>
                    <button className="btn accessory-add add-cart" onClick={this.handleAddToCart}>Add Hunting Color To Cart</button>
                  </div>

                  <div className="col-md-6">
                    <h5>Target Colors (1.8 mm)</h5>
                    <select id='variants-ultimate-string-loop-4.5in' className='form-control'
                            name='variants-ultimate-string-loop-4.5in' onChange={this.handleDLoopChange}>
                      <option>Please select a color</option>
                      {getTargetColors(accessory)}
                    </select>
                    <button className="btn accessory-add add-cart" onClick={this.handleAddToCart}>Add Target Color To Cart</button>
                  </div>
                </div>

                </fieldset>
              </div>
            </article>
          );
        });
        return stringLoopAccNodes;
      } else {
        return <h1>Loading ...</h1>;
      }
    }
    return (
      <div>
        <Helmet>
          <title>Winner's Choice Ultimate String Loops - Our ultimate string loop material is the best the industry has to offer. Available in a variety of colors to add to the personalization of your custom string. Each package includes either 4.5-inch and 2-foot sections in either 1.8 (target) or 2.0mm (hunting) diameters</title>
        </Helmet>
        <section className="" id="ultimate-string-loop">
            <header>
              <h1>Ultimate String Loop</h1>
            </header>
            <p>Our ultimate string loop material is the best the industry has to offer. Available in a variety of colors to add to the personalization of your custom string. Each package includes either 4.5-inch and 2-foot sections in either 1.8 (target) or 2.0mm (hunting) diameters.</p>
            {getStringLoops().length === 0 ?  <img className="cart-ajax-loader" src="https://s3.amazonaws.com/string-builder/website-images/cart-ajax-loader.gif" role="presentation" /> : getStringLoops()}
        </section>
        <div className='hidden-modal'>
          <div className='notify'>
            <img className='img-responsive' src="https://s3.amazonaws.com/string-builder/website-images/D-Loop-Camo.jpg" alt='Winners Choice Strings - Ultimate String Loop' />
            <p>added to your shopping cart</p>
            <h5>Ultimate String Loop</h5>
            <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
            <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
            <AssistModal />
          </div>
        </div>
    </div>
    );
  }
}
