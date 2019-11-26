import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Routes from '../app/routes';

import { connect } from 'react-redux';
import { fetchProducts as fetchProductsAction } from './assets/utilities/products/products-actions';
import { addToCart as addToCartAction } from './../site-cart/assets/utilities/cart/cart-actions';

class AccessoriesLayout extends Component {

  componentDidMount() {
    if(this.props.location.pathname === "/winners-choice-accessories/t-shirt-60x" || this.props.location.pathname === "/winners-choice-accessories/hat") {
      if(this.props.apparel.length <= 1) this.props.fetchProducts("apparel");
    } else {
      if(this.props.accessories.length <= 1) this.props.fetchProducts("accessory");
    }
  }

  componentDidUpdate() {
    if(this.props.location.pathname === "/winners-choice-accessories/t-shirt-60x" || this.props.location.pathname === "/winners-choice-accessories/hat") {
      if(this.props.apparel.length <= 1) this.props.fetchProducts("apparel");
    } else {
      if(this.props.accessories.length <= 1) this.props.fetchProducts("accessory");
    }
  }

  handleAddToCart(event) {
    window.ga('send', 'event', 'Page Interaction');
    event.preventDefault();
  }


  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/winners-choice-accessories/nitro-button-balls' render={() => <Routes.NitroButtonBalls {...this.props} />} />
          <Route exact path='/winners-choice-accessories/ultimate-string-loop' render={() => <Routes.UltimateStringLoop {...this.props} />} />
          <Route exact path='/winners-choice-accessories/cobalt-ice-string-wax' render={() => <Routes.CobaltIceStringWax {...this.props} />} />
          <Route exact path='/winners-choice-accessories/hat' render={() => <Routes.Hat {...this.props} />} />
          <Route exact path='/winners-choice-accessories/t-shirt-60x' render={() => <Routes.Shirt60X {...this.props} />} />
          <Route path='*' component={Routes.BadURL} />
        </Switch>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (store) => {
  return {
    accessories: store.productsState.accessories,
    apparel: store.productsState.apparel
  };
}

export default connect(mapStateToProps, {fetchProducts: fetchProductsAction, addToCart: addToCartAction})(AccessoriesLayout);
