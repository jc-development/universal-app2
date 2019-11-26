import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as prebuildStringsConfig from '../string-builder/assets/utilities/string-configuration/pre-rendered-strings-config';
import { buildPreconfigString as buildPreconfigStringAction } from './../string-builder/assets/utilities/string-configuration/string-configuration-actions';

class WhyWinnersChoice extends Component {

  constructor(props) {
    super(props);

    this.handlePreconfigStringClick = this.handlePreconfigStringClick.bind(this);
  }

  handlePreconfigStringClick(event) {
    window.ga('send', 'event', 'Page Interaction');
     const name = event.currentTarget.getAttribute('data-name');
     let stringOption = {};
      switch(name) {
        case 'silver-black-white':
          stringOption = prebuildStringsConfig.silverBlackWhite;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'flame-silver-black':
          stringOption = prebuildStringsConfig.flameSilverBlack;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'flogreen-black-black':
          stringOption = prebuildStringsConfig.floGreenBlackBlack;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'floyellow-floyellow-floyellow':
          stringOption = prebuildStringsConfig.floYellowfloYellowfloYellow;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'buckskin-odgreen-white':
          stringOption = prebuildStringsConfig.buckskinODGreenWhite;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'red-red-black':
          stringOption = prebuildStringsConfig.redRedBlack;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'floorange-flogreen-white':
          stringOption = prebuildStringsConfig.floorangeFlogreenWhite;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'yellow-yellow-yellow':
          stringOption = prebuildStringsConfig.yellowYellowYellow;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'flopink-flopink-black':
          stringOption = prebuildStringsConfig.flopinkFlopinkBlack;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'royalblue-royalblue-white':
          stringOption = prebuildStringsConfig.royalblueRoyalBlueWhite;
          this.props.buildPreconfigString(stringOption);
          break;

        case 'purple-purple-purple':
          stringOption = prebuildStringsConfig.purplePurplePurple;
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
      <section id="why-winners-choice">
        <Helmet>
          <title>Why Winner's Choice Strings - All Winner’s Choice bowstrings are made using our exclusive and unique manufacturing method that essentially pre-stretches the stands of Dyneema at the molecular level.</title>
        </Helmet>
        <figure className="why-winners-choice-figure pre-config">
          <div className="text-center">
            <h2>Winner's Choice Professional Shooter</h2>
            <p>Mike "Mr.Perfect" Schloesser</p>
            <p>2017 Vegas Shoot Winner &amp; Stage 3 Indoor World Cup Winner</p>
          </div>
        <img src="https://s3.amazonaws.com/string-builder/website-images/image-background.jpg" className="img-responsive home-img-main" alt='Winners Choice Strings Pro Shooter Mike Schloesse Wins Vega Shoot' role="presentation" />
          <figcaption>
            <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
            <dl>
              <dt>Pictured Configuration</dt>
              <dd><span>Material:</span> 452X</dd>
              <dd><span>String Strand Color 1:</span> Red</dd>
              <dd><span>String Strand Color 2:</span> Red</dd>
              <dd><span>Serving Color:</span> Black</dd>
            </dl>
            <Link className="btn" to="/string-builder" data-name="red-red-black" onClick={this.handlePreconfigStringClick}>Build This String</Link>
          </figcaption>
        </figure>

        <h1>Winner's Choice is Designed to Excel</h1>
        <article id="pimmp" className="">
          <header>
            <h2>Proprietary Interlocking Molecular Manufacturing Process</h2>
          </header>
          <p>Every strand is pre-stretched at the molecular level, eliminating movement. 3 to 5 shot shoot-in and no peep rotation or string creep.</p>
          <p>All Winner’s Choice bowstrings are made using our exclusive and unique manufacturing method. This system essentially pre-stretches the stands of Dyneema at the molecular level. The result is a bowstring that experiences virtually no movement which means your Winner’s Choice Bowstring will take just a few shots to shoot it.</p>
        </article>

        <figure className="pre-config">
          <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/flo-pink-string.jpg" alt="Winner's Choice Proprietary Interlocking Molecular Manufacturing Process ensures your bowstring is pre-stretched" role="presentation" />
          <figcaption>
            <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="flopink-flopink-black" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
            <dl>
              <dt>Pictured Configuration</dt>
              <dd><span>Material:</span> 452X</dd>
              <dd><span>String Strand 1 Color:</span> Fluorescent Pink</dd>
              <dd><span>String Strand 2 Color:</span> Fluorescent Pink</dd>
              <dd><span>String Serving Color:</span> Black</dd>
              <dd><span>Accessory:</span> D-Loop Black</dd>
            </dl>
            <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="flopink-flopink-black" onClick={this.handlePreconfigStringClick}>Build This String</Link>
          </figcaption>
        </figure>

        <article id="x-braid" className="">
          <header>
            <h2>X-Braid Plus Serving</h2>
            <h3>60% stronger than other braided servings</h3>
          </header>
              <p>If you read our guarantee you’ll notice we boldly stand behind our bowstrings in multiple ways, one of which is guaranteeing against serving separation. We can do this because of X-Braid Plus. Our X-Braid Plus servings are 60% stronger than other braided servings. This allows our patented serving system to install these servings with considerably more tension. This, in turn, prevents serving separation.</p>
              <ul>
                <li>X-Braid Plus servings are 60% stronger which allows them to be installed at greater tension with proprietary equipment</li>
                <li>Prevents serving separation — GUARANTEED!</li>
                <li>Double the life of your Winner’s Choice bowstring!</li>
              </ul>
              <img className="img-responsive icon" src="https://s3.amazonaws.com/string-builder/website-images/iron-clad.png" alt="Winner's Choice Iron Clad Loop Serving" role="presentation" />
        </article>

        <figure className="pre-config">
          <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/purple-string.jpg" alt="Winner's Choice X-Braid Plus Servings are 60% stronger than the competition" role="presentation" />
          <figcaption style={preConfigRightStyle}>
            <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="purple-purple-purple" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
            <dl>
              <dt>Pictured Configuration</dt>
              <dd><span>Material:</span> 452X</dd>
              <dd><span>String Strand 1 Color:</span> Purple</dd>
              <dd><span>String Strand 2 Color:</span> Purple</dd>
              <dd><span>Serving Color:</span> Purple</dd>
            </dl>
            <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="purple-purple-purple" onClick={this.handlePreconfigStringClick}>Build This String</Link>
          </figcaption>
        </figure>

        <article id="weatherlock" className="">
          <header>
            <h2>WeatherLock™ Technology</h2>
            <h3>High-tech string treatment</h3>
          </header>
          <p>Weatherlock is our new high-tech string treatment that we apply to every Winner’s Choice bowstring. Weatherlock is factory-installed and is designed to replace string wax or conditioner. It penetrates the bowstring fibers reducing internal wear and reducing string fuzziness with almost no string weight gain.</p>
          <ul>
            <li>Factory-applied treatment penetrates string fibers with almost no weight gain</li>
            <li>Prevents moisture absorption greatly enhancing accuracy in moist conditions</li>
            <li>Reduced heat absorption in warm weather for enhanced accuracy</li>
            <li>Minimizes string wear and string fuzziness</li>
          </ul>
          <img className="img-responsive icon" src="https://s3.amazonaws.com/string-builder/website-images/weather-lock.png" alt="Winner's Choice WeatherLock Technology" role="presentation" />
        </article>

        <figure className="pre-config">
          <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/blue-string.jpg" alt="Winner's Choice WeatherLock prevents moisture absorption, heat,and minimizes string wear " role="presentation" />
          <figcaption style={preConfigRightStyle}>
            <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="royalblue-royalblue-white" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
            <dl>
              <dt>Pictured Configuration</dt>
              <dd><span>Material:</span> 452X</dd>
              <dd><span>String Strand 1 Colors:</span> Royal Blue</dd>
              <dd><span>String Strand 2 Colors:</span> Royal Blue</dd>
              <dd><span>Serving Colors:</span> White</dd>
              <dd><span>Accessory:</span> D-Loop Black</dd>
            </dl>
            <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="royalblue-royalblue-white" onClick={this.handlePreconfigStringClick}>Build This String</Link>
          </figcaption>
        </figure>

        <article id="quality" className="">
          <header>
            <h2>Quality Checked</h2>
          </header>
          <p>Your Winner’s Choice bowstring will be right — We GUARANTEE it!</p>
          <p>Each and every Winner’s Choice bowstring is checked and re-checked by quality control professionals to assure that your Winner’s Choice bowstring will perform from the very first shot. This may add to the overall cost, but it’s worth every penny because we want you to have a great experience with our product!</p>
        </article>

        <figure className="pre-config">
          <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/yellow-string.jpg" alt="Winner's Choice bowstrings are check by our quality control professionals" role="presentation" />
          <figcaption>
            <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="yellow-yellow-yellow" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
            <dl>
              <dt>Pictured Configuration</dt>
              <dd><span>Material:</span> 452X</dd>
              <dd><span>String Strand 1 Colors:</span> Yellow</dd>
              <dd><span>String Strand 2 Colors:</span> Yellow</dd>
              <dd><span>Serving Colors:</span> Yellow</dd>
              <dd><span>Accessory:</span> Black Nitro XL Buttons</dd>
            </dl>
            <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="yellow-yellow-yellow" onClick={this.handlePreconfigStringClick}>Build This String</Link>
          </figcaption>
        </figure>

        <article id="assembled" className="">
          <header>
            <h2>Assembled by Hand</h2>
          </header>
              <p>High performance assured</p>
              <p>Unmatched quality Made in the U.S.A.</p>
              <p>Your Winner's Choice bowstring is largely assembled by hand by experienced String Technicians who care, here in the U.S.A.</p>
        </article>

        <figure className="pre-config">
          <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/orange-and-green-string.jpg" alt="All Winner's Choice bowstrings are made in the U.S.A. " role="presentation" />
          <figcaption>
            <Link className="btn mobile-preconfig-btn" to="/string-builder" data-name="floorange-flogreen-white" onClick={this.handlePreconfigStringClick}>Build This String</Link>
            <img className="img-responsive ship-image" src="https://s3.amazonaws.com/string-builder/website-images/ship-3day.png" alt="Winners Choice Strings ship within 3 days" />
            <dl>
              <dt>Pictured Configuration</dt>
              <dd><span>Material:</span> 452X</dd>
              <dd><span>String Strand 1 Colors:</span> Fluorescent Orange</dd>
              <dd><span>String Strand 2 Colors:</span> Fluorescent Green</dd>
              <dd><span>Serving Colors:</span> White</dd>
              <dd><span>Accessory:</span> Black Nitro XL Buttons</dd>
            </dl>
            <Link className="btn desktop-preconfig-btn" to="/string-builder" data-name="floorange-flogreen-white" onClick={this.handlePreconfigStringClick}>Build This String</Link>
          </figcaption>
        </figure>

      </section>
    );
  }
}

export default connect(null, {buildPreconfigString: buildPreconfigStringAction})(WhyWinnersChoice)
