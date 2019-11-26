import React, { Component } from 'react';
import { connect } from 'react-redux'
import _reduce from 'lodash/reduce';
import _debounce from 'lodash/debounce';
import TweenMax from 'gsap/TweenMax';

import DesktopNav from './child-components/DesktopNav';
import MobileNav from './child-components/MobileNav';

import './assets/css/main-nav.css';

class MainNavigation extends Component {

  constructor (props) {
   super (props)

   this.state = {
      cartItemsCount: 0,
      dropdownMainVisible: false,
      dropdownAccessoriesVisible: false,
      navWidth: null
   }

   this.handleDropdownMain = this.handleDropdownMain.bind(this);
   this.handleSubMenuClick = this.handleSubMenuClick.bind(this);

   this.handleDropdownAccessories = this.handleDropdownAccessories.bind(this);
   this.handleSubAccessoriesMenuClick = this.handleSubAccessoriesMenuClick.bind(this)

   this.handleNavWidth = _debounce(this.handleNavWidth.bind(this), 150);

  }

  handleDropdownMain(event) {
    event.preventDefault();
    this.setState({
      dropdownMainVisible: !this.state.dropdownMainVisible
    });
  }

  handleSubMenuClick() {
    this.setState({
      dropdownMainVisible: !this.state.dropdownMainVisible
    });
  }

  handleDropdownAccessories(event) {
    event.preventDefault();
    this.setState({
      dropdownAccessoriesVisible: !this.state.dropdownAccessoriesVisible
    });
  }

  handleSubAccessoriesMenuClick() {
    if (this.state.navWidth > 1008) {
      this.setState({
        dropdownAccessoriesVisible: !this.state.dropdownAccessoriesVisible
      });
    } else {
      this.setState({
        dropdownMainVisible: !this.state.dropdownMainVisible,
        dropdownAccessoriesVisible: !this.state.dropdownAccessoriesVisible
      });
    }
  }

  handleNavWidth() {
    this.setState({navWidth: this.mainNav.clientWidth})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {

      this.setState({
        cartItemsCount: nextProps.items.length
      }, function () {
        return this.state
      })

      if (nextProps.items.length > 0) {

        TweenMax.set('.cart-items-circle', {display: 'block'})
        TweenMax.to('.cart-items-circle', 1, {
          css: {
            padding: '0px',
            height: '25px',
            width: '25px',
            lineHeight: '0',
            textAlign: 'center',
            position: 'absolute',
            top: '4px',
            left: '19px',
            backgroundColor: '#286090',
            borderRadius: '50%'
          }
        })
        TweenMax.to('.cart-item-number', 1, {autoAlpha: 1})
      } else {
        TweenMax.to('.cart-items-circle', 1, {
          css: {
            width: '0',
            height: '0',
            padding: '0'
          }
        })
        TweenMax.to('.cart-item-number', 1, {autoAlpha: 0})

      }
    }
  }

  componentDidMount() {
    this.handleNavWidth();
    window.addEventListener('resize', this.handleNavWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleNavWidth)
  }

  render() {
    return (
      <header id="main-nav" ref={(el) => this.mainNav = el}>
      { this.state.navWidth !== null ?
         this.state.navWidth > 1008 ?
          <DesktopNav
            cartItemsCount={this.state.cartItemsCount}
            handleDropdownAccessories={this.handleDropdownAccessories}
            dropdownAccessoriesVisible={this.state.dropdownAccessoriesVisible}
            handleSubAccessoriesMenuClick={this.handleSubAccessoriesMenuClick}
          />
          : 
          <MobileNav
            cartItemsCount={this.state.cartItemsCount}
            handleDropdownAccessories={this.handleDropdownAccessories}
            dropdownAccessoriesVisible={this.state.dropdownAccessoriesVisible}
            handleSubAccessoriesMenuClick={this.handleSubAccessoriesMenuClick}
            handleDropdownMain={this.handleDropdownMain}
            handleSubMenuClick={this.handleSubMenuClick}
            dropdownMainVisible={this.state.dropdownMainVisible}
          />
        : null
      }
      </header>
   
      // <nav className="navbar navbar-default">

      //   <div className="container-fluid">
      //     <div className="navbar-header">
      //       <button type="button" className="navbar-toggle" onClick={this.handleDropdownMain}>
      //         <span className="sr-only">Toggle navigation</span>
      //         <FontAwesomeIcon icon={faBars} className="fa fa-bars" />
      //       </button>
      //       <Link id="mobile-cart" role="button" to="/cart"><div className="cart-items-circle"><span className='cart-item-number'>{this.state.cartItemsCount}</span></div><FontAwesomeIcon icon={faShoppingCart} className="fa fa-shopping-cart" /></Link>
      //       <Link id="mobile-home" className="navbar-brand" role="button" to="/"><img src="https://s3.amazonaws.com/string-builder/website-images/WC-logo.png" className="logo-size" alt="Winner's Choice Strings Logo" /></Link>
      //     </div>

      //     {this.state.dropdownMainVisible ?
      //       <div className="collapse navbar-collapse">
      //         <ul className="nav navbar-nav">
      //           <li id="desktop-home"><Link className="navbar-brand" role="button" to="/"><img src="https://s3.amazonaws.com/string-builder/website-images/WC-logo.png" className="logo-size" alt="Winner's Choice Strings Logo" /></Link></li>
      //           <li><Link id="string-builder-link" role="button" to="/string-builder">STRING BUILDER</Link></li>
      //           <li className={this.state.dropdownAccessoriesVisible ? "dropdown open" : "dropdown" }>
      //             <a href='#' className='dropdown-toggle' onClick={this.handleDropdownAccessories}>ACCESSORIES<div className="mobile-icon-style"><FontAwesomeIcon icon={faCaretDown} className="fa fa-caret-down" /></div></a>
      //               <ul className='dropdown-menu acc-dropdown'>
      //                 <li><Link role="button" to='/winners-choice-accessories/t-shirt-60x'><img className="acc-nav-img" role="presentation" src="https://s3.amazonaws.com/string-builder/website-images/wc-60xbetter-tee-back.jpg" alt="Winners Choice Strings 60X T-Shirt" />Winner's Choice 60X T-Shirt</Link></li>
      //                 <li><Link role="button" to='/winners-choice-accessories/hat'><img className="acc-nav-img" role="presentation" src="https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg" alt="Winners Choice Strings Hat" />Winner's Choice Hat</Link></li>
      //                 <li><Link role="button" to='/winners-choice-accessories/ultimate-string-loop'><img role="presentation" className="acc-nav-img" src="https://s3.amazonaws.com/string-builder/website-images/D-Loop-Camo.jpg" alt="Winners Choice Strings Ultimate D Loop" />Ultimate String Loop</Link></li>
      //                 <li><Link role="button" to='/winners-choice-accessories/cobalt-ice-string-wax'><img role="presentation" className="acc-nav-img" src="https://s3.amazonaws.com/string-builder/website-images/winners-cobalt-ice.jpg" alt="Winners Choice Strings Cobalt Ice Wax" />Cobalt Ice String Wax</Link></li>
      //                 <li><Link role="button" to='/winners-choice-accessories/nitro-button-balls'><img role="presentation" className="acc-nav-img" src="https://s3.amazonaws.com/string-builder/website-images/winners-buttons-nav.jpg" alt="Winners Choice Strings Nitro Balls & Buttons" />Nitro Balls &amp; XL Buttons</Link></li>
      //               </ul>
      //           </li>
      //           <li><Link role="button" to="/why-winners-choice">WHY WINNER'S CHOICE</Link></li>
      //           <li><Link role="button" to="/how-strings-and-cables-are-made">HOW STRINGS ARE MADE</Link></li>
      //           <li><Link role="button" to="/frequently-asked-questions">FAQS</Link></li>
      //           <li><Link role="button" to="/lifetime-string-performance-guarantee">GUARANTEE</Link></li>
      //           <li><a role="button" href="https://news.winnerschoicestrings.com/" rel="noopener noreferrer" target="_blank">NEWS</a></li>
      //           <li><Link role="button" to="/contact-winners-choice">CONTACT</Link></li>
      //           <li id="desktop-cart"><Link role="button" to="/cart"><div className="cart-items-circle"><span className='cart-item-number'>{this.state.cartItemsCount}</span></div>CART</Link></li>
      //         </ul>
      //       </div>
      //       : null}
      //   </div>
      // </nav>
    );
  }
}

const mapStateToProps = ({cartState}) => {
  return {
    items: cartState.items
  }
}

export default connect(mapStateToProps)(MainNavigation)
