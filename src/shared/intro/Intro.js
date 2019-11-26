import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TweenMax from 'gsap/TweenMax';
import * as prebuildStringsConfig from '../string-builder/assets/utilities/string-configuration/pre-rendered-strings-config';

import { connect } from 'react-redux';
import _find from 'lodash/find';

import { buildPreconfigString as buildPreconfigStringAction } from './../string-builder/assets/utilities/string-configuration/string-configuration-actions';


class Intro extends Component {

  constructor(props) {
    super(props);

    // pass this as a prop from container parent
    this.handlePreconfigStringClick = this.handlePreconfigStringClick.bind(this);

  }

  handlePreconfigStringClick(event) {
    window.ga('send', 'event', 'Page Interaction');
    const name = event.currentTarget.getAttribute('data-name');
    let stringOption = {};

    switch(name) {
      case 'floOrange-floOrange-floOrange':
        stringOption = prebuildStringsConfig.floorangeFloorangeFloorange;
        this.props.buildPreconfigString(stringOption);
        break;

      case 'teal-teal-teal':
        stringOption = prebuildStringsConfig.tealTealTeal;
        this.props.buildPreconfigString(stringOption);
        break;

      case 'orange-black-white':
        stringOption = prebuildStringsConfig.orangeBlackWhite;
        this.props.buildPreconfigString(stringOption);
        break;

      case 'white-royalBlue-black':
        stringOption = prebuildStringsConfig.whiteRoyalBlueBlack;
        this.props.buildPreconfigString(stringOption);
        break;

      default:
        break;
    }

  }



  render () {

    const imgStyle = { width: "100%", padding: "1rem"};
    return (
      <section id="intro">
          <article>
            <div className="intro-text-overlay">
              <h1>THE ONLY CHOICE IS THE WINNER'S CHOICE</h1>
              <p>Strings matter. Leave nothing to chance.</p>
              <Link className="btn" to="/string-builder">START BUILDING YOUR STRING</Link>
            </div>

            <div>
              <img style={imgStyle} src="https://string-builder.s3.amazonaws.com/website-images/black-friday-2019/WC-banner-blackfriday-poster.jpg" alt="25% OFF on Winner's Choice Custom String Sets" />
            </div>

            <article className="row" id="readers-choice">
              <div className="col-sm-4">
                <img src="https://s3.amazonaws.com/string-builder/website-images/2017-Gold.jpeg" alt="Winner's Choice Bowstrings is a multiple time Hunting World Readers Choice Winner" className="img-responsive" role="presentation" />
              </div>
              <div className="col-sm-8">
                <h1>Winner's Choice is<br />the choice of champions</h1>
                <p>Time tested designs and materials, and a manufacturing process that's second to none. Don't accept imitations. Don't settle for less than the best. There's only one Winner's Choice, and we don't cut corners. And neither should you.</p>
                <p><Link className="btn internal-link" to="/string-builder">Build your strings</Link> with <em>LIMITLESS</em> custom string configurations and options that <u>ship to your door</u> within days, <em>not weeks</em>.</p>
                <div className="row">
                  <h2>Superior Materials<br />
                  Proprietary Construction<br />
                  Unmatched Performance</h2>
                  <p>Winner's Choice premium bowstrings are made of the very best materials available and are built using state-of-the-art manufacturing techniques.
                    The result is a bowstring that is second-to-none when it comes to durability and performance.</p>
                </div>
              </div>
            </article>
              <img className="img-responsive" src="https://string-builder.s3.amazonaws.com/website-images/wc-banner-ships.jpg" alt="Winners Choice Strings Ship In Days Not Weeks" role="presentation" />
          </article>

          <hr className="mobile-content-break" />


          <figure className="pre-config">
            <img src="https://s3.amazonaws.com/string-builder/website-images/wc-demir-elmaagacli.jpg" className="img-responsive img-preconfig" alt="Winner's Choice Strings - White and Royal Blue Colors on 452x Material" role="presentation" />
            <figcaption className="top-right">
              <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="white-royalBlue-black" onClick={this.handlePreconfigStringClick}>Build This String</Link>
              <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
              <dl>
                <dt>Pictured Configuration</dt>
                <dd><span>Material:</span> 452x</dd>
                <dd><span>String Strand Color 1:</span> White</dd>
                <dd><span>String Strand Color 2:</span> Royal Blue</dd>
                <dd><span>Serving Color:</span> Black</dd>
              </dl>
              <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="white-royalBlue-black" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            </figcaption>
          </figure>

          <article className="row" id="string-wax">
            <div className="col-sm-7">
              <h1>Prolong Your String Life</h1>
              <h3>Winner's Choice Cobalt Ice String Wax</h3>
              <p>Cobalt Ice uses WeatherLock Technology to seal, condition and protect the fibers of your strings and cables for long lasting effectiveness and ultimate performance.</p>
              <Link className="btn" to="/winners-choice-accessories/cobalt-ice-string-wax">Buy Now</Link>
            </div>
            <div className="col-sm-5">
              <img src="https://s3.amazonaws.com/string-builder/website-images/closeup-cobalt-wax.jpg" alt="Winner's Choice Bowstrings - Cobalt Ice Strings and Cables Wax" className="img-responsive" role="presentation" />
            </div>
          </article>

          <figure className="pre-config">
            <img src="https://s3.amazonaws.com/string-builder/website-images/contactUsBackground.jpg" className="img-responsive" alt="Winner's Choice Strings - Orange and Black Colors on 8125G Material" role="presentation" />
            <figcaption>
              <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="orange-black-white" onClick={this.handlePreconfigStringClick}>Build This String</Link>
              <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
              <dl>
                <dt>Pictured Configuration</dt>
                <dd><span>Material:</span> 8125G</dd>
                <dd><span>String Strand Color 1:</span> Sunset Orange</dd>
                <dd><span>String Strand Color 2:</span> Black</dd>
                <dd><span>Serving Color:</span> White</dd>
                <dd><span>Accessory:</span> Black Nitro XL Buttons</dd>
              </dl>
              <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="orange-black-white" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            </figcaption>
          </figure>

          <article id="intro-end-content">
            <header>
              <h2>Winner's Choice is the world's most advanced and reliable bowstring</h2>
            </header>
            <p>With Winner's Choice, string creep, peep rotation and serving separation issues will be a thing of the past. Winner's Choice makes premium strings and cables for many models of crossbows, long bows, recurve bows, and compound bows.</p>

            <div className="row intro-img-section">
              <div className="col-sm-4"><img src="https://s3.amazonaws.com/string-builder/website-images/ritual-green-string.jpg" className="img-responsive" role="presentation" /></div>
              <div className="col-sm-4"><img src="https://s3.amazonaws.com/string-builder/website-images/long.jpg" className="img-responsive" role="presentation" /></div>
              <div className="col-sm-4"><img src="https://s3.amazonaws.com/string-builder/website-images/crossbow.jpg" className="img-responsive" role="presentation" /></div>
            </div>
          </article>
      </section>
    )
  }

}


export default connect(null, {buildPreconfigString: buildPreconfigStringAction})(Intro)
