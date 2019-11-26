import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart, faCaretDown } from '@fortawesome/fontawesome-free-solid';
import './../assets/css/mobile-nav.css';

export default class MobileNav extends Component {

  constructor (props) {
   super (props)
  }

  render() {
    return (
      <nav id="mobile-nav">
        <ul>
            <li id="mobile-logo"><Link role="button" to="/"><img src="https://s3.amazonaws.com/string-builder/website-images/WC-logo.png" className="nav-logo" alt="Winner's Choice Strings Logo" /></Link></li>
            <ul id="mobile-right">
                <li id="mobile-cart"><Link role="button" to="/cart"><div className="cart-items-circle"><span className='cart-item-number'>{this.props.cartItemsCount}</span></div><FontAwesomeIcon icon={faShoppingCart} size="2x" /></Link></li>
                <li><button onClick={this.props.handleDropdownMain}><FontAwesomeIcon icon={faBars} size="2x" /></button></li>
            </ul>
        </ul>

        <ul className={this.props.dropdownMainVisible ? "dropdown-main-menu open" : "dropdown-main-menu"}>
            <li><Link id="string-builder-link" role="button" to="/string-builder" onClick={this.props.handleSubMenuClick}>STRING BUILDER</Link></li>
            <li>
                <a href='#' className='dropdown-toggle' onClick={this.props.handleDropdownAccessories}>ACCESSORIES<FontAwesomeIcon icon={faCaretDown} className="acc-caret-icon" /></a>
                <ul style={this.props.dropdownAccessoriesVisible ? {display: "block"} : {display: "none"}} className={this.props.dropdownAccessoriesVisible ? "dropdown-accessories open" : "dropdown-accessories"}>
                    <li><Link role="button" to='/winners-choice-accessories/t-shirt-60x' onClick={this.props.handleSubAccessoriesMenuClick}><img className="acc-nav-img" role="presentation" src="https://s3.amazonaws.com/string-builder/website-images/wc-60xbetter-tee-back.jpg" alt="Winners Choice Strings 60X T-Shirt" />Winner's Choice 60X T-Shirt</Link></li>
                    <li><Link role="button" to='/winners-choice-accessories/hat' onClick={this.props.handleSubAccessoriesMenuClick}><img className="acc-nav-img" role="presentation" src="https://s3.amazonaws.com/string-builder/website-images/winners-hat.jpg" alt="Winners Choice Strings Hat" />Winner's Choice Hat</Link></li>
                    <li><Link role="button" to='/winners-choice-accessories/ultimate-string-loop' onClick={this.props.handleSubAccessoriesMenuClick}><img role="presentation" className="acc-nav-img" src="https://s3.amazonaws.com/string-builder/website-images/D-Loop-Camo.jpg" alt="Winners Choice Strings Ultimate D Loop" />Ultimate String Loop</Link></li>
                    <li><Link role="button" to='/winners-choice-accessories/cobalt-ice-string-wax' onClick={this.props.handleSubAccessoriesMenuClick}><img role="presentation" className="acc-nav-img" src="https://s3.amazonaws.com/string-builder/website-images/winners-cobalt-ice.jpg" alt="Winners Choice Strings Cobalt Ice Wax" />Cobalt Ice String Wax</Link></li>
                    <li><Link role="button" to='/winners-choice-accessories/nitro-button-balls' onClick={this.props.handleSubAccessoriesMenuClick}><img role="presentation" className="acc-nav-img" src="https://s3.amazonaws.com/string-builder/website-images/winners-buttons-nav.jpg" alt="Winners Choice Strings Nitro Balls & Buttons" />Nitro Balls &amp; XL Buttons</Link></li>
                </ul>
            </li>
            <li><Link role="button" to="/why-winners-choice" onClick={this.props.handleSubMenuClick}>WHY WINNER'S CHOICE</Link></li>
            <li><Link role="button" to="/how-strings-and-cables-are-made" onClick={this.props.handleSubMenuClick}>HOW STRINGS ARE MADE</Link></li>
            <li><Link role="button" to="/frequently-asked-questions" onClick={this.props.handleSubMenuClick}>FAQS</Link></li>
            <li><Link role="button" to="/lifetime-string-performance-guarantee" onClick={this.props.handleSubMenuClick}>GUARANTEE</Link></li>
            <li><a role="button" href="https://news.winnerschoicestrings.com/" rel="noopener noreferrer" target="_blank" onClick={this.props.handleSubMenuClick}>NEWS</a></li>
            <li><Link role="button" to="/contact-winners-choice" onClick={this.props.handleSubMenuClick}>CONTACT</Link></li>
        </ul>
      </nav>
    );
  }
}
