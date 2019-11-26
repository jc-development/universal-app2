import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _some from 'lodash/some';


/*
  This component will check the App Cart State and will ask appropriately timed questions,
  to pitch accessories based on what is in the cart.
*/

class AssistModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      hasWax: false,
      hasNitroBalls: false,
      hasNitroXLButtons: false,
      hasStringLoops: false,
      hasSuperCustomString: false,
      freeShirtAdded: false,
      freeStringWax: false,
      freeHat: false,
      freeStringLoop: false,
    };
  }

  checkWhatsInCart() {
    // super custom string
    // console.log('this.state.items: ', this.state.items);

    if (_some(this.state.items, (item) => { return (item.price === "140.00" && item.stringCustomizationLevel === "super-custom-string") })) {
      this.setState({
        hasSuperCustomString: true
      });
    } else {
      this.setState({
        hasSuperCustomString: false
      });
    }

    // is free shirt added
    if (_some(this.state.items, (item) => { return (item.price === "0.00" && item.packageName === "Winner's Choice 60X T-Shirt") })) {
      this.setState({
        freeShirtAdded: true
      });
    } else {
      this.setState({
        freeShirtAdded: false
      });
    }

    // is free string wax added
    if (_some(this.state.items, (item) => { return (item.price === "0.00" && item.title === 'Cobalt Ice String Wax') })) {
      this.setState({
        freeStringWax: true
      });
    } else {
      this.setState({
        freeStringWax: false
      });
    }

    // is free hat added
    if (_some(this.state.items, (item) => { return (item.price === "0.00" && item.title === "Winner's Choice Logo Hat") })) {
      this.setState({
        freeHat: true
      });
    } else {
      this.setState({
        freeHat: false
      });
    }

    // is free string loop
    if (_some(this.state.items, (item) => { return (item.price === "0.00" && item.packageName === "Ultimate String Loop - 4.5 in. Package") })) {
      this.setState({
        freeStringLoop: true
      });
    } else {
      this.setState({
        freeStringLoop: false
      });
    }

    // string wax
    if (_some(this.state.items, (item) => { return item.title === 'Cobalt Ice String Wax' })) {
      this.setState({
        hasWax: true
      });
    } else {
      this.setState({
        hasWax: false
      });
    }
    // nitroBalls
    if (_some(this.state.items, (item) => { return item.packageName === 'Nitro Balls' })) {
      this.setState({
        hasNitroBalls: true
      });
    } else {
      this.setState({
        hasNitroBalls: false
      });
    }
    // nitroButtons
    if (_some(this.state.items, (item) => { return item.packageName === 'Nitro XL Buttons' })) {
      this.setState({
        hasNitroXLButtons: true
      });
    } else {
      this.setState({
        hasNitroXLButtons: false
      });
    }
    // string Loops
    if (_some(this.state.items, (item) => { return (item.packageName === 'Ultimate String Loop - 2ft. Package' || item.packageName === 'Ultimate String Loop - 4.5 in. Package') })) {
      this.setState({
        hasStringLoops: true
      });
    } else {
      this.setState({
        hasStringLoops: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        items: nextProps.cartItems
      }, () => {
        this.checkWhatsInCart()
      });
    }
  }

  render() {
    return (
      <article id="accessories-pitch">
        <h4>Helpful Accessories</h4>
        {this.state.hasWax === false ? <p>Prolong your string &amp; cables with some <Link to="/winners-choice-accessories/cobalt-ice-string-wax">Cobalt String Wax</Link></p> : null}
        {this.state.hasNitroBalls === false ? <p>Eliminate nock pinch and increase the overall speed of your bow with some <Link onClick={this.props.handleModalClose} to="/winners-choice-accessories/nitro-button-balls">Nitro Balls</Link></p> : null}
        {this.state.hasNitroXLButtons === false ? <p>Rid yourself of unwanted noise and bad vibes with some <Link onClick={this.props.handleModalClose} to="/winners-choice-accessories/nitro-button-balls">Nitro XL Buttons</Link></p> : null}
        {this.state.hasStringLoops === false ? <p>Don't pinch your string, use <Link to="/winners-choice-accessories/ultimate-string-loop">Ultimate String Loops</Link> instead</p> : null}
      </article>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    cartItems: store.cartState.items
  };
}

export default connect(mapStateToProps)(AssistModal);
