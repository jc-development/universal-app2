import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainFooter extends Component {
  render() {
    return (
      <footer className="jumbotron col-xs-12">
        <div className="container">
        <img className="img-responsive ships-in-days-builder" src="https://string-builder.s3.amazonaws.com/website-images/black-friday-2019/WC-banner-blackfriday-banner.jpg" alt="25% Off on Winner's Choice Custom String Sets" role="presentation" />
          <ul className="nav nav-justified">
            <li><a href='https://s3.amazonaws.com/string-builder/documents/winnerschoice-catalog.pdf' target='_blank'>CATALOG</a></li>
            <li><a href='https://s3.amazonaws.com/togllc.com/2017-TOG-MAP-Policy.pdf' target='_blank'>TOG MAP POLICY</a></li>
            <li><Link to="/become-a-dealer">BECOME A DEALER</Link></li>
          </ul>
          <h4>IT'S WINNER'S CHOICE CUSTOM BOWSTRINGS &amp; CABLES</h4>
          <h3 className="col-md-12">With decades of experience, innovation and engineering behind our belts, we're not afraid to call out our competitors.
We say with confidence that we're <strong>at least</strong> 60X better than the competition. Our strings are better, more durable, totally customizable, and put to the test before they arrive at your door. Our strings are the choice of champions.</h3>
          <h3>- WINNER'S CHOICE STRINGS AND CABLES SHIP IN DAYS NOT WEEKS -</h3>
          <img src="https://s3.amazonaws.com/string-builder/website-images/madeinusa.png" className="img-responsive" alt="Winners Choice Bowstrings are made in the USA" />
          <ul className="row">
            <div className="icon-holder">
              <h3>SPREAD THE WORD</h3>
              <li><a target="_blank" href="https://www.facebook.com/WinnersChoiceCustomBowstrings/?fref=ts"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
              <li><a target="_blank" href="https://twitter.com/wcbowstrings"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
            </div>
          </ul>
          <article className="row">
            <h3>WINNERS CHOICE HAS OVER 100 YEARS OF COMBINED ENGINEERING &amp; MANUFACTURING EXPERIENCE BUILDING THE BEST QUALITY STRINGS</h3>
            <div className="col-md-6">
              <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/2017-Gold.jpeg"  alt="Winners Choice Bowstrings is Bowhunting World Reader's Choice Gold Award 2017" />
            </div>
            <div className="col-md-6">
              <img className="img-responsive" src="https://s3.amazonaws.com/string-builder/website-images/multi-awards.png" alt="Winners Choice Bowstrings is Bowhunting World Reader's Choice Award Winner For Over A Decade"/>
            </div>
          </article>
        </div>
      </footer>
    )
  }
}
