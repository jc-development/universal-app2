import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import _find from 'lodash/find';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';
import AssistModal from './../modals/AssistModal';

export default class NitroButtonBalls extends Component {

  constructor(props) {
    super(props);
    this.nitroBallAcc = {};
    this.nitroXLButtonAcc = {};
    this.handleNitroBallChange = this.handleNitroBallChange.bind(this);
    this.handleNitroXLButtonChange = this.handleNitroXLButtonChange.bind(this);

    this.handleAddNitroBallToCart = this.handleAddNitroBallToCart.bind(this);
    this.handleAddXLButtonToCart = this.handleAddXLButtonToCart.bind(this);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleNitroBallChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    const colorName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('value');
    const price = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-price');
    const packageName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-package');
    const variantId = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant');

    this.nitroBallAcc = {
      packageName: packageName,
      colorName: colorName,
      price: price,
      variantId: variantId
    };
  }

  handleNitroXLButtonChange(event) {
    window.ga('send', 'event', 'Page Interaction');
    const colorName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('value');
    const price = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-price');
    const packageName = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-package');
    const variantId = event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-variant');

    this.nitroXLButtonAcc = {
      packageName: packageName,
      colorName: colorName,
      price: price,
      variantId: variantId
    };
  }

  handleAddNitroBallToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
    if (event.currentTarget.parentNode.childNodes[0].childNodes[1].options.selectedIndex !== 0) {
      const accessoryConfig = this.nitroBallAcc;
      this.props.addToCart(accessoryConfig);

      TweenMax.to("#NitroBalls", 0, {display: "block"})
    } else {
      console.log('not going to do it. pick a color from dropdown')
    }
  }

  handleAddXLButtonToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
    if (event.currentTarget.parentNode.childNodes[0].childNodes[1].options.selectedIndex !== 0) {
      const accessoryConfig = this.nitroXLButtonAcc;
      this.props.addToCart(accessoryConfig);

      TweenMax.to("#NitroXLButtons", 0, {display: "block"})
    } else {
      console.log('not going to do it. pick a color from dropdown')
    }
  }

  handleModalClose() {
    window.ga('send', 'event', 'Page Interaction');
    TweenMax.to("#NitroBalls", 0, {display: "none"})
    TweenMax.to("#NitroXLButtons", 0, {display: "none"})
  }

  render() {

    this.nitroBallAcc = _find(this.props.accessories, (accessory) => {
      return (accessory.handle === 'nitro-button-pack-of-6');
    });

    this.nitroXLButtonAcc = _find(this.props.accessories, (accessory) => {
      return (accessory.handle === 'nitro-xl-button-pack-of-2');
    });

    const getNitroBalls = () => {
      // another way to test if something is a promise: !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
      if (typeof this.nitroBallAcc !== 'undefined' && !(Promise.resolve(this.nitroBallAcc) === this.nitroBallAcc)) {
        const nitroBallNodes = this.nitroBallAcc.variants.map( (color, i) => {
          return (<option key={i} data-package="Nitro Balls" data-variant={color.id} data-price="4.00" value={color.title}>{color.title}</option>)
        });
        return nitroBallNodes;
      } else {
        return 'Loading ...';
      }
    }

    const getNitroXLButtons = () => {
      // another way to test if something is a promise: !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
      if (typeof this.nitroXLButtonAcc !== 'undefined' && !(Promise.resolve(this.nitroXLButtonAcc) === this.nitroXLButtonAcc)) {
        const nitroXLNodes = this.nitroXLButtonAcc.variants.map( (color, i) => {
          return (<option key={i} data-package="Nitro XL Buttons" data-variant={color.id} data-price="8.00" value={color.title}>{color.title}</option>);
        });
        return nitroXLNodes;
      } else {
        return 'Loading ...';
      }

    }

    return (
      <div>
        <Helmet>
          <title>Winner's Choice Strings - NITRO BALLS - perfect accessory for archers looking to get a little extra speed & XL BUTTONS - accessory to eliminate unwanted bow noise and vibrations.</title>
        </Helmet>
        <section id="nitro-button-balls">
          <header>
            <h1>Nitro Balls &amp; XL Buttons</h1>
          </header>
          <article className="accessory">
            <img role="presentation" className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/winners-buttons.jpg" alt='Winners Choice Strings - Nitro Balls (Pack of 6)' />
            <header>
              <h2>Nitro Balls</h2>
              <h4>*A single pack contains 6</h4>
              <h5>2 packs are recommended for compound bows</h5>
              <p><strong>$4.00</strong></p>
            </header>
            <p>Nitro Buttons eliminate nock pinch and can increase the overall speed of a bow, making it the perfect accessory for archers looking to get a little extra speed from their old bow or looking to turn their new bow into a lightning fast, turbo charged rig. Inexpensive Nitro Buttons can give a bow more speed without breaking the bank.</p>
            <p>Weight Each: 2.2 Grains</p>
            <div className='form-inline accessory-add-section'>
              <fieldset className='form-group select-group'>
                <label htmlFor='variants-balls'>SELECT YOUR COLOR</label>
                  <select id='variants-balls' className='form-control'
                          name='variants-balls' onChange={this.handleNitroBallChange}>
                          <option>Please select a color</option>
                    {getNitroBalls()}
                  </select>
              </fieldset>
              <button className="btn nitro-add add-cart" onClick={this.handleAddNitroBallToCart}>Add To Cart</button>
            </div>
          </article>

          <hr/>
          <article className="accessory">
            <img role="presentation" className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/winners-xl-buttons.jpg" alt='Winners Choice Strings - Nitro XL Buttons (Pack of 2)' />
            <header>
              <h2>Nitro XL Buttons </h2>
              <h4>*A single pack contains 2</h4>
              <h5>2 packs are recommended for compound bows</h5>
              <p><strong>$8.00</strong></p>
            </header>
            <p>Nitro Button XLs can help eliminate unwanted bow noise and vibrations and can be installed in minutes. With the accessory Button XL, those problems are a thing of the past. Inexpensive Nitro Button XLs can give a bow more speed without breaking the bank and they look awesome on any bow. Nitro Button XLs can help eliminate unwanted bow noise and vibrations and can be installed in minutes. Nitro Button XLs add style and function to a bow and come in a wide variety of colors. Keeping with the current trend, we have designed brilliant colors that will match the various string colors, bows and accessories on the market so regardless of what color accessories an archer has on his or her bow, we have a color to match.</p>
            <p>Weight Each: 19 Grains</p>
            <div className='form-inline accessory-add-section'>
              <fieldset className='form-group select-group'>
                <label htmlFor='variants-xl-buttons'>SELECT YOUR COLOR</label>
                  <select id='variants-xl-buttons' className='form-control'
                          name='variants-xl-buttons' onChange={this.handleNitroXLButtonChange}>
                    <option>Please select a color</option>
                    {getNitroXLButtons()}
                  </select>
              </fieldset>
              <button className="btn nitro-add add-cart" onClick={this.handleAddXLButtonToCart}>Add To Cart</button>
            </div>
          </article>
      </section>
      <div id="NitroBalls" className='hidden-modal'>
        <div className='notify'>
          <img className='img-responsive' src="https://s3.amazonaws.com/string-builder/website-images/winners-buttons.jpg" alt='Winners Choice Strings - Nitro Balls (Pack of 6)' />
          <p>added to your shopping cart</p>
          <h5>Nitro Balls</h5>
          <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
          <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
          <AssistModal handleModalClose={this.handleModalClose} />
        </div>
      </div>
      <div id="NitroXLButtons" className='hidden-modal'>
        <div className='notify'>
          <img className='img-responsive' src="https://s3.amazonaws.com/string-builder/website-images/winners-xl-buttons.jpg" alt='Winners Choice Strings - Nitro XL Buttons (Pack of 2)' />
          <p>added to your shopping cart</p>
          <h5>Nitro XL Buttons</h5>
          <button onClick={this.handleModalClose} className='btn'>Continue Shopping</button>
          <Link className='btn' to='/cart'>Go To Shopping Cart</Link>
          <AssistModal handleModalClose={this.handleModalClose} />
        </div>
      </div>
    </div>
    );
  }
}
