import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as prebuildStringsConfig from '../string-builder/assets/utilities/string-configuration/pre-rendered-strings-config';
import { buildPreconfigString as buildPreconfigStringAction } from './../string-builder/assets/utilities/string-configuration/string-configuration-actions';

class Guarantee extends Component {
  constructor(props) {
    super(props);
    this.handlePreconfigStringClick = this.handlePreconfigStringClick.bind(this);
  }

  handlePreconfigStringClick(event) {
    const name = event.currentTarget.getAttribute('data-name');
    let stringOption = {};

    switch(name) {
      case 'buckskin-odgreen-white':
        stringOption = prebuildStringsConfig.buckskinODGreenWhite;
        this.props.buildPreconfigString(stringOption);
        break;

      case 'flogreen-flogreen-flogreen':
        stringOption = prebuildStringsConfig.flogreenFlogreenFlogreen;
        this.props.buildPreconfigString(stringOption);
        break;

      default:
        break;
    }
  }

  render() {

    const preConfigRightStyle = {
      left: "auto",
      right:0
    };

    return (
      <section id="guarantee">
        <Helmet>
          <title>Winner's Choice Strings - Lifetime String Performance Guarantee - No creep, no peep rotation and no serving separation.</title>
        </Helmet>
        <article>
            <header className="text-center">
              <h1 className="guarantee-page">Lifetime String Performance Guarantee</h1>
              <p>Winner's Choice Lifetime String Performance Guarantee: No creep, no peep rotation and no serving separation.</p>
            </header>
            <div className="guarantee-content">
              <img src="https://s3.amazonaws.com/string-builder/website-images/guarantee.png" className="img-responsive" role="presentation" alt="Winners Choice Lifetime String Performance Guarantee: no creep, no peep rotation, and no serving separation" />
              <p>At Winner's Choice, we build a better bowstring. We use <Link className="btn internal-link" to="/why-winners-choice">state-of-the-art materials</Link>, customized manufacturing processes, and innovative technology to assure you of the ultimate in bowstring performance. Put a Winner's Choice bowstring on your bow and string creep, peep rotation and serving separation issues will be a thing of the past. We guarantee it! We call it the Lifetime String Performance Guarantee because that is precisely what it is. Performance. Guaranteed!</p>
            </div>
        </article>

          <figure className="pre-config">
            <img src="https://s3.amazonaws.com/string-builder/website-images/flo-green-string.jpg" className="img-responsive" role="presentation" alt="Winner's Choice Strings - Fluorescent Green Colors on a 452X Material" />
            <figcaption style={preConfigRightStyle}>
              <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="flogreen-flogreen-flogreen" onClick={this.handlePreconfigStringClick}>Build This String</Link>
              <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
              <dl>
                <dt>Pictured Configuration</dt>
                <dd><span>Material:</span> 452X</dd>
                <dd><span>String Strand 1 Colors:</span> Fluorescent Green</dd>
                <dd><span>String Strand 2 Colors:</span> Fluorescent Green</dd>
                <dd><span>Serving Colors:</span> Fluorescent Green</dd>
                <dd><span>Accessory:</span> Black Nitro XL Buttons</dd>
              </dl>
              <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="flogreen-flogreen-flogreen" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            </figcaption>
          </figure>

        <article className="guarantee-content">
          <header>
            <h2><u>Each and every</u> Winner's Choice Bowstring is checked</h2>
          </header>
          <p>Each and every Winner’s Choice bowstring is checked and re-checked by quality control professionals to assure that your Winner’s Choice bowstring will perform from the very first shot. We want you to have a great experience with our product!</p>
        </article>
    </section>
    );
  }
}

export default connect(null, {buildPreconfigString: buildPreconfigStringAction})(Guarantee)
